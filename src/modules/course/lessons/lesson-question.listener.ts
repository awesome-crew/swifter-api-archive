import { Handler } from '@awesome-dev/server-event-emitter';
import { Injectable } from '@nestjs/common';
import { NextQuestionTransferRequestedEvent } from './events';

import { LessonQuestionService } from './lesson-question.service';

@Injectable()
export class LessonQuestionListener {
  constructor(private readonly service: LessonQuestionService) {}

  @Handler(NextQuestionTransferRequestedEvent)
  async onNextQuestionTransferRequested(
    event: NextQuestionTransferRequestedEvent,
  ) {
    const { lessonId, questionId, companyMember } = event.payload;

    const nextQuestionId = await this.service.getNextQuestionId(
      lessonId,
      questionId,
    );

    if (nextQuestionId == null) {
      return;
    }

    await this.service.transfer(nextQuestionId, companyMember);
  }
}
