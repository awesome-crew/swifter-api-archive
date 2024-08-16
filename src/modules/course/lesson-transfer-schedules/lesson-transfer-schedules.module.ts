import { TypeOrmModule } from '@awesome-dev/server-typeorm';
import { Module } from '@nestjs/common';

import { LessonsModule } from '../lessons/lessons.module';
import { SmsTransferHistoriesModule } from '../sms-transfer-histories/sms-transfer-histories.module';

import { LessonTransferScheduleRepository } from './repositories';

import { LessonTransferScheduleService } from './lesson-transfer-schedule.service';
import { LessonTransferScheduler } from './lesson-transfer.scheduler';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonTransferScheduleRepository]),
    LessonsModule,
    SmsTransferHistoriesModule,
  ],
  providers: [LessonTransferScheduleService, LessonTransferScheduler],
  exports: [LessonTransferScheduleService],
})
export class LessonTransferSchedulesModule {}
