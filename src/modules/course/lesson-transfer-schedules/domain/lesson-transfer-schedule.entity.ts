import { BaseIdEntity } from '@awesome-dev/server-common';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from '@awesome-dev/server-typeorm';
import { ValueOf } from '@awesome-dev/typings';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum } from 'class-validator';

import { CourseEntity } from '../../courses/entities';
import { LessonEntity } from '../../lessons/entities';

export const LessonTransferScheduleStatus = {
  PENDING: 'PENDING',
  TRANSFERRED: 'TRANSFERRED',
} as const;
export type LessonTransferScheduleStatus = ValueOf<
  typeof LessonTransferScheduleStatus
>;

@Entity({ name: 'lesson_transfer_schedule' })
@Index('idx_status-date', ['status', 'date'])
export class LessonTransferScheduleEntity extends BaseIdEntity {
  constructor(attr?: Partial<LessonTransferScheduleEntity>) {
    super(attr);
  }

  @ApiProperty({ type: () => CourseEntity })
  @ManyToOne('CourseEntity')
  @JoinColumn()
  course: CourseEntity;
  @ApiProperty()
  @Column()
  courseId: number;
  @ApiProperty({ type: () => LessonEntity })
  @ManyToOne('LessonEntity', 'questions')
  @JoinColumn()
  lesson: LessonEntity;
  @ApiProperty()
  @Column()
  lessonId: number;

  @ApiProperty({ enum: LessonTransferScheduleStatus })
  @IsEnum(LessonTransferScheduleStatus)
  @Column({
    type: 'enum',
    enum: LessonTransferScheduleStatus,
    default: LessonTransferScheduleStatus.PENDING,
  })
  status: LessonTransferScheduleStatus;
  @ApiProperty()
  @IsDateString()
  @Column({ type: 'date' })
  date: string;
}
