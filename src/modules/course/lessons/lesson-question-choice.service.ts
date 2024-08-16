import { BaseService } from '@awesome-dev/server-common';
import { Injectable } from '@nestjs/common';

import { LessonQuestionChoiceEntity } from './entities';
import { LessonQuestionChoiceRepository } from './repositories';

@Injectable()
export class LessonQuestionChoiceService extends BaseService<LessonQuestionChoiceEntity> {
  constructor(readonly repository: LessonQuestionChoiceRepository) {
    super();
  }

  async getIdsByQuestionId(questionId: number) {
    const entities = await this.repository.find({
      select: ['id'],
      where: { questionId },
    });

    return entities.map((entity) => entity.id);
  }
}
