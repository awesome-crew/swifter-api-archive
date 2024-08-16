import {
  AdminController,
  BaseAdminController,
} from '@awesome-dev/server-admin';
import { CourseAttendanceEntity } from '@/modules/course/courses/entities';
import { CourseAttendanceService } from '@/modules/course/courses/course-attendance.service';

@AdminController(CourseAttendanceEntity)
export class AdminCourseAttendancesController extends BaseAdminController<CourseAttendanceEntity> {
  constructor(readonly service: CourseAttendanceService) {
    super(service);
  }
}
