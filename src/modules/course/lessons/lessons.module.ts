import { TypeOrmModule } from '@awesome-dev/server-typeorm';
import { Module, forwardRef } from '@nestjs/common';

import { SmsTransferHistoriesModule } from '../sms-transfer-histories/sms-transfer-histories.module';

import {
  LessonQuestionChoiceRepository,
  LessonQuestionRepository,
  LessonRepository,
} from './repositories';

import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { LessonQuestionChoiceService } from './lesson-question-choice.service';
import { LessonQuestionController } from './lesson-question.controller';
import { LessonQuestionService } from './lesson-question.service';
import { LessonQuestionListener } from './lesson-question.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LessonQuestionChoiceRepository,
      LessonQuestionRepository,
      LessonRepository,
    ]),
    forwardRef(() => SmsTransferHistoriesModule),
  ],
  controllers: [LessonController, LessonQuestionController],
  providers: [
    LessonQuestionChoiceService,
    LessonQuestionService,
    LessonService,
    LessonQuestionListener,
  ],
  exports: [LessonQuestionChoiceService, LessonQuestionService, LessonService],
})
export class LessonsModule {}
