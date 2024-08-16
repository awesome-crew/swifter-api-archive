import { BaseRepository } from '@awesome-dev/server-common';
import { CustomRepository } from '@awesome-dev/server-typeorm';

import { LessonTransferScheduleEntity } from '../domain';

@CustomRepository(LessonTransferScheduleEntity)
export class LessonTransferScheduleRepository extends BaseRepository<LessonTransferScheduleEntity> {}
