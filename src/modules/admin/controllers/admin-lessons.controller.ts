import {
  AdminController,
  BaseAdminController,
} from '@awesome-dev/server-admin';

import { LessonEntity } from '@/modules/course/lessons/entities';
import { LessonService } from '@/modules/course/lessons/lesson.service';

@AdminController(LessonEntity)
export class AdminLessonsController extends BaseAdminController<LessonEntity> {
  constructor(readonly service: LessonService) {
    super(service);
  }
}
