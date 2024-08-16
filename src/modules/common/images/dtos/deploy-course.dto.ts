import { ValidateNested } from 'class-validator';
import { PickType, ApiProperty } from '@nestjs/swagger';

import { CourseEntity } from '@/modules/course/courses/entities';
import { LessonTransferScheduleEntity } from '@/modules/course/lesson-transfer-schedules/domain';

export class DeployCourseDto extends PickType(CourseEntity, ['deployTime']) {
  @ApiProperty({ type: () => [LessonTransferScheduleDto] })
  @ValidateNested({ each: true })
  lessonTransferSchedules: LessonTransferScheduleDto[];
}

class LessonTransferScheduleDto extends PickType(LessonTransferScheduleEntity, [
  'lessonId',
  'date',
]) {}
