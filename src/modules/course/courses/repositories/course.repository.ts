import { BaseRepository } from '@awesome-dev/server-common';
import { CustomRepository } from '@awesome-dev/server-typeorm';

import { CourseEntity } from '../entities';

@CustomRepository(CourseEntity)
export class CourseRepository extends BaseRepository<CourseEntity> {}
