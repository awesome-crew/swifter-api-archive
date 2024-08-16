import { Not } from '@awesome-dev/server-typeorm';
import { BaseService, EntityRelations } from '@awesome-dev/server-common';
import { Injectable } from '@nestjs/common';

import { LessonEntity, LessonQuestionEntity } from '../lessons/entities';

import {
  SmsTransferHistoryEntity,
  SmsTransferType,
  SmsTransferStatus,
} from './domain';
import { SmsTransferHistoryRepository } from './repositories';

@Injectable()
export class SmsTransferHistoryService extends BaseService<SmsTransferHistoryEntity> {
  constructor(readonly repository: SmsTransferHistoryRepository) {
    super();
  }

  createByLesson(
    lesson: LessonEntity,
    companyMemberId: number,
    option?: { failed: boolean },
  ) {
    return this.create({
      courseId: lesson.courseId,
      lessonId: lesson.id,
      companyMemberId,
      type: SmsTransferType.CONTENT,
      status: option?.failed
        ? SmsTransferStatus.SEND_FAILED
        : SmsTransferStatus.NOT_ANSWERED,
    });
  }

  createByQuestion(
    question: LessonQuestionEntity,
    companyMemberId: number,
    option?: { failed: boolean },
  ) {
    return this.create({
      courseId: question.courseId,
      lessonId: question.lessonId,
      lessonQuestionId: question.id,
      companyMemberId,
      type: SmsTransferType.QUESTION,
      status: option?.failed
        ? SmsTransferStatus.SEND_FAILED
        : SmsTransferStatus.NOT_ANSWERED,
    });
  }

  async updateByAnswer(
    question: LessonQuestionEntity,
    companyMemberId: number,
    lessonQuestionChoiceId: number | null,
    answerText: string,
    isCorrect: boolean,
  ) {
    const existing = await this.findOne({
      select: ['id'],
      where: { companyMemberId, lessonQuestionId: question.id },
    });

    if (existing == null) {
      return;
    }

    return this.update(existing.id, {
      status: SmsTransferStatus.ANSWERED,
      answerText,
      answeredAt: new Date(),
      wasCorrectAnswer: isCorrect,
    });
  }

  getLatestByMemberId(
    companyMemberId: number,
    relations?: EntityRelations<SmsTransferHistoryEntity>,
  ) {
    return this.repository.findOne({
      where: { companyMemberId },
      order: { id: 'DESC' },
      relations,
    });
  }

  getTransferCountByQuestionId(lessonQuestionId: number) {
    return this.repository.count({
      where: {
        lessonQuestionId,
        type: SmsTransferType.QUESTION,
        status: Not(SmsTransferStatus.SEND_FAILED),
      },
    });
  }

  getAnswerCountByQuestionId(lessonQuestionId: number) {
    return this.repository.count({
      where: {
        lessonQuestionId,
        type: SmsTransferType.QUESTION,
        status: SmsTransferStatus.ANSWERED,
      },
    });
  }

  getAnswerCountByChoiceId(
    lessonQuestionId: number,
    lessonQuestionChoiceId: number,
  ) {
    return this.repository.count({
      where: {
        lessonQuestionId,
        lessonQuestionChoiceId,
        type: SmsTransferType.QUESTION,
        status: SmsTransferStatus.ANSWERED,
      },
    });
  }
}
