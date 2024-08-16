import {
  AdminController,
  BaseAdminController,
} from '@awesome-dev/server-admin';

import { LessonQuestionEntity } from '@/modules/course/lessons/entities';
import { LessonQuestionService } from '@/modules/course/lessons/lesson-question.service';

@AdminController(LessonQuestionEntity)
export class AdminLessonQuestionsController extends BaseAdminController<LessonQuestionEntity> {
  constructor(readonly service: LessonQuestionService) {
    super(service);
  }
}
