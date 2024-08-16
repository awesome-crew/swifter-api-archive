import { getRandomIntBetween } from '@awesome-dev/server-common';
import { EventEmitter, Handler } from '@awesome-dev/server-event-emitter';
import { Injectable } from '@nestjs/common';
import { delay } from '@toss/utils';

import { NextQuestionTransferRequestedEvent } from '../lessons/events';

import {
  LessonSmsTransferedEvent,
  LessonSmsTransferFailedEvent,
  QuestionSmsAnsweredEvent,
  QuestionSmsTransferedEvent,
  QuestionSmsTransferFailedEvent,
} from './events';

import { SmsTransferHistoryService } from './sms-transfer-history.service';

@Injectable()
export class SmsTransferListener {
  constructor(
    private readonly service: SmsTransferHistoryService,
    private readonly eventEmitter: EventEmitter,
  ) {}

  private delayRandomTime() {
    const FROM_5초_TO_15초 = 100 * getRandomIntBetween(50, 150);

    return delay(FROM_5초_TO_15초);
  }

  @Handler(LessonSmsTransferedEvent)
  async onLessonSmsTransfered(event: LessonSmsTransferedEvent) {
    const { lesson, companyMember } = event.payload;

    await this.service.createByLesson(lesson, companyMember.id);

    await this.delayRandomTime();

    this.eventEmitter.emit(
      new NextQuestionTransferRequestedEvent({
        lessonId: lesson.id,
        companyMember,
      }),
    );
  }

  @Handler(LessonSmsTransferFailedEvent)
  async onLessonSmsTransferFailed(event: LessonSmsTransferFailedEvent) {
    const { lesson, companyMember } = event.payload;

    await this.service.createByLesson(lesson, companyMember.id, {
      failed: true,
    });
  }

  @Handler(QuestionSmsTransferedEvent)
  async onQuestionSmsTransfered(event: QuestionSmsTransferedEvent) {
    const { question, companyMember } = event.payload;

    await this.service.createByQuestion(question, companyMember.id);
  }

  @Handler(QuestionSmsTransferFailedEvent)
  async onQuestionSmsTransferFailed(event: QuestionSmsTransferFailedEvent) {
    const { question, companyMember } = event.payload;

    await this.service.createByQuestion(question, companyMember.id, {
      failed: true,
    });
  }

  @Handler(QuestionSmsAnsweredEvent)
  async onQuestionSmsAnswered(event: QuestionSmsAnsweredEvent) {
    const { question, companyMember, answerText, isCorrect, choice } =
      event.payload;

    await this.service.updateByAnswer(
      question,
      companyMember.id,
      choice?.id ?? null,
      answerText,
      isCorrect,
    );

    await this.delayRandomTime();

    this.eventEmitter.emit(
      new NextQuestionTransferRequestedEvent({
        lessonId: question.lessonId,
        questionId: question.id,
        companyMember,
      }),
    );
  }
}
