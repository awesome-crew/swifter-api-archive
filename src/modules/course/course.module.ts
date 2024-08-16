import { Module } from '@nestjs/common';

import { CoursesModule } from './courses/courses.module';
import { LessonTransferSchedulesModule } from './lesson-transfer-schedules/lesson-transfer-schedules.module';
import { LessonsModule } from './lessons/lessons.module';
import { SmsTransferHistoriesModule } from './sms-transfer-histories/sms-transfer-histories.module';

@Module({
  imports: [
    CoursesModule,
    SmsTransferHistoriesModule,
    LessonTransferSchedulesModule,
    LessonsModule,
  ],
})
export class CourseModule {}
