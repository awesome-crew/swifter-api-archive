import { BaseRepository } from '@awesome-dev/server-common';
import { CustomRepository } from '@awesome-dev/server-typeorm';

import { LessonEntity } from '../entities';

@CustomRepository(LessonEntity)
export class LessonRepository extends BaseRepository<LessonEntity> {}
