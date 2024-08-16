import { match } from 'ts-pattern';
import { BaseService } from '@awesome-dev/server-common';
import { EventEmitter } from '@awesome-dev/server-event-emitter';
import { isEmptyArrayOrNil } from '@awesome-dev/utils';
import { Injectable } from '@nestjs/common';
import { WhatsappService } from '@awesome-dev/server-whatsapp';
import { range } from '@toss/utils';

import { isAlphabet } from '@/common/helpers/isAlphabet';
import {
  getCharFromIndex,
  getIndexFromChar,
} from '@/common/helpers/getCharFromIndex';
import { CompanyMemberEntity } from '@/modules/company/company-members/domain';
import { CacheService } from '@/providers/cache/redis';

import {
  QuestionSmsAnsweredEvent,
  QuestionSmsTransferFailedEvent,
  QuestionSmsTransferedEvent,
} from '../sms-transfer-histories/events';
import { LessonQuestionEntity, LessonQuestionType } from './entities';
import { LessonQuestionRepository } from './repositories';

import { SmsTransferHistoryService } from '../sms-transfer-histories/sms-transfer-history.service';
import { LessonQuestionChoiceService } from './lesson-question-choice.service';

@Injectable()
export class LessonQuestionService extends BaseService<LessonQuestionEntity> {
  constructor(
    readonly repository: LessonQuestionRepository,

    private readonly cacheService: CacheService,
    private readonly eventEmitter: EventEmitter,
    private readonly whatsappService: WhatsappService,

    private readonly lessonQuestionChoiceService: LessonQuestionChoiceService,
    private readonly smsTransferHistoryService: SmsTransferHistoryService,
  ) {
    super();
  }

  getNextQuestionId(lessonId: number, questionId?: number) {
    return this.cacheService.getOrSet({
      key: `next-question:${lessonId}:${questionId}`,
      ttl: 1000 * 60,
      cb: async () => this.repository.getNextQuestionId(lessonId, questionId),
    });
  }

  async transfer(id: number, to: CompanyMemberEntity) {
    const question = await this.repository.get(id, ['choices']);

    if (!question) {
      return;
    }

    try {
      const messageBody = match(question.type)
        .with(LessonQuestionType.FREE_ANSWER, () => question.content)
        .with(
          LessonQuestionType.MULTIPLE_CHOICE,
          () =>
            `${question.content}\n\n${question.choices.map((choice, index) => `${getCharFromIndex(index)}. ${choice.content}`).join('\n')}`,
        )
        .exhaustive();

      await this.whatsappService.sendTextMessage({
        to: to.phoneNumber,
        body: messageBody,
      });

      this.eventEmitter.emit(
        new QuestionSmsTransferedEvent({ question, companyMember: to }),
      );
    } catch {
      this.eventEmitter.emit(
        new QuestionSmsTransferFailedEvent({ question, companyMember: to }),
      );
    }
  }

  async transferFeedback(
    id: number,
    answerText: string,
    to: CompanyMemberEntity,
  ) {
    const question = await this.repository.get(id, ['choices']);

    if (question == null) {
      return;
    }

    if (question.type === LessonQuestionType.FREE_ANSWER) {
      return this.transferFreeAnswerFeedback(question, answerText, to);
    } else {
      return this.transferMultipleChoicesFeedback(question, answerText, to);
    }
  }

  private async transferFreeAnswerFeedback(
    question: LessonQuestionEntity,
    answerText: string,
    to: CompanyMemberEntity,
  ) {
    await this.whatsappService.sendTextMessage({
      to: to.phoneNumber,
      body: question.freeAnswerFeedback,
    });

    this.eventEmitter.emit(
      new QuestionSmsAnsweredEvent({
        question,
        companyMember: to,
        answerText,
        isCorrect: true,
      }),
    );
  }

  private async transferMultipleChoicesFeedback(
    question: LessonQuestionEntity,
    answerText: string,
    to: CompanyMemberEntity,
  ) {
    const slicedAnswer = answerText.slice(0, 5);

    const validAnswers = range(question.choices.length).map(getCharFromIndex);
    const includedValidAnswers = slicedAnswer
      .split('')
      .filter(isAlphabet)
      .map((x) => x.toUpperCase())
      .filter((x) => validAnswers.includes(x));

    // 어느 선택지도 입력하지 않았을 경우 - 다시 답변하라는 메시지 전송
    if (isEmptyArrayOrNil(includedValidAnswers)) {
      await this.whatsappService.sendTextMessage({
        to: to.phoneNumber,
        body: '다시 답변해주세요',
      });
      return;
    }

    // 입력된 알파벳 중 첫번째를 답변으로 인식
    const answeredChoice =
      question.choices[getIndexFromChar(includedValidAnswers[0])];

    await this.whatsappService.sendTextMessage({
      to: to.phoneNumber,
      body: answeredChoice.feedback,
    });

    this.eventEmitter.emit(
      new QuestionSmsAnsweredEvent({
        question,
        choice: answeredChoice,
        companyMember: to,
        answerText,
        isCorrect: answeredChoice.isAnswer,
      }),
    );
  }

  getTransferCount(id: number) {
    return this.smsTransferHistoryService.getTransferCountByQuestionId(id);
  }

  getAnswerCount(id: number) {
    return this.smsTransferHistoryService.getAnswerCountByQuestionId(id);
  }

  async getChoiceResponseCounts(id: number) {
    const choiceIde =
      await this.lessonQuestionChoiceService.getIdsByQuestionId(id);

    const choiceResponseCounts = await Promise.all(
      choiceIde.map(async (choiceId) => {
        const answerCount =
          await this.smsTransferHistoryService.getAnswerCountByChoiceId(
            id,
            choiceId,
          );
        return {
          choiceId,
          answerCount,
        };
      }),
    );

    return choiceResponseCounts;
  }

  async getMetadata(id: number) {
    const transferCount = await this.getTransferCount(id);

    const answerCount = await this.getAnswerCount(id);

    const choiceResponseCounts = await this.getChoiceResponseCounts(id);

    return { transferCount, answerCount, choiceResponseCounts };
  }
}
