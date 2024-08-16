import { BaseIdEntity } from '@awesome-dev/server-common';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from '@awesome-dev/server-typeorm';
import { ValueOf } from '@awesome-dev/typings';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { CompanyEntity } from '@/modules/company/companies/domain';

import { LessonEntity } from '../../lessons/entities';

import { CourseAttendanceEntity } from './course-attendance.entity';

export const CourseDeployStatus = {
  PENDING: 'PENDING',
  DEPLOYING: 'DEPLOYING',
  DEPLOYED: 'DEPLOYED',
} as const;
export type CourseDeployStatus = ValueOf<typeof CourseDeployStatus>;

@Entity({ name: 'course' })
export class CourseEntity extends BaseIdEntity {
  constructor(attr?: Partial<CourseEntity>) {
    super(attr);
  }

  @ApiProperty({ type: () => CompanyEntity })
  @ManyToOne('CompanyEntity')
  @JoinColumn()
  company: CompanyEntity;
  @ApiProperty()
  @Column()
  companyId: number;

  @OneToMany('CourseAttendanceEntity', 'course')
  attendances: CourseAttendanceEntity[];
  @OneToMany('LessonEntity', 'course', { cascade: true })
  lessons: LessonEntity[];

  @ApiProperty()
  @Column()
  title: string;
  @ApiProperty()
  @Column()
  description: string;
  @ApiProperty()
  @Column()
  imageUrl: string;

  @ApiProperty({ enum: CourseDeployStatus })
  @IsEnum(CourseDeployStatus)
  @Column({
    type: 'enum',
    enum: CourseDeployStatus,
    default: CourseDeployStatus.PENDING,
  })
  deployStatus: CourseDeployStatus;
  @ApiProperty()
  @Column({ type: 'time', nullable: true })
  deployTime: string;
}
