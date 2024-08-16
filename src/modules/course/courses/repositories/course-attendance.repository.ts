import { BaseRepository } from '@awesome-dev/server-common';
import { CustomRepository } from '@awesome-dev/server-typeorm';

import { CourseAttendanceEntity } from '../entities';

@CustomRepository(CourseAttendanceEntity)
export class CourseAttendanceRepository extends BaseRepository<CourseAttendanceEntity> {}
