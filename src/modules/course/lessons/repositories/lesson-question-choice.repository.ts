import { BaseRepository } from '@awesome-dev/server-common';
import { CustomRepository } from '@awesome-dev/server-typeorm';

import { LessonQuestionChoiceEntity } from '../entities';

@CustomRepository(LessonQuestionChoiceEntity)
export class LessonQuestionChoiceRepository extends BaseRepository<LessonQuestionChoiceEntity> {}
