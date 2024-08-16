import { TypeOrmModule } from '@awesome-dev/server-typeorm';
import { Module } from '@nestjs/common';

import { CourseAttendanceRepository, CourseRepository } from './repositories';

import { LessonTransferSchedulesModule } from '../lesson-transfer-schedules/lesson-transfer-schedules.module';
import { SmsTransferHistoriesModule } from '../sms-transfer-histories/sms-transfer-histories.module';
import { CourseAttendanceService } from './course-attendance.service';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseAttendanceRepository, CourseRepository]),
    LessonTransferSchedulesModule,
    SmsTransferHistoriesModule,
  ],
  controllers: [CoursesController],
  providers: [CourseAttendanceService, CoursesService],
  exports: [CourseAttendanceService, CoursesService],
})
export class CoursesModule {}
