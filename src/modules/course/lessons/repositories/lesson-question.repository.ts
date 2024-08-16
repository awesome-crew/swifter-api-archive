import { BaseRepository } from '@awesome-dev/server-common';
import { CustomRepository } from '@awesome-dev/server-typeorm';
import { last } from '@toss/utils';

import { LessonQuestionEntity } from '../entities';

@CustomRepository(LessonQuestionEntity)
export class LessonQuestionRepository extends BaseRepository<LessonQuestionEntity> {
  async getNextQuestionId(lessonId: number, questionId?: number) {
    const questions = await this.find({
      where: { lessonId },
      order: { order: 'ASC' },
      select: ['id'],
    });

    if (questions.length === 0) {
      return null;
    }
    if (questionId == null) {
      return questions[0].id;
    }
    if (last(questions)?.id === questionId) {
      return null;
    }

    const index = questions.findIndex((q) => q.id === questionId);
    return questions[index + 1]?.id;
  }
}
