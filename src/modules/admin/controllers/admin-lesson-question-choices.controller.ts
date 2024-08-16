import { LessonQuestionChoiceEntity } from '@/modules/course/lessons/entities';
import { LessonQuestionChoiceService } from '@/modules/course/lessons/lesson-question-choice.service';
import {
  AdminController,
  BaseAdminController,
} from '@awesome-dev/server-admin';

@AdminController(LessonQuestionChoiceEntity)
export class AdminLessonQuestionChoicesController extends BaseAdminController<LessonQuestionChoiceEntity> {
  constructor(readonly service: LessonQuestionChoiceService) {
    super(service);
  }
}
