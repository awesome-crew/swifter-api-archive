import { BaseIdEntity } from '@awesome-dev/server-common';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from '@awesome-dev/server-typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { CompanyMemberEntity } from '@/modules/company/company-members/domain';

import { CourseEntity } from './course.entity';

@Entity({ name: 'course_attendance' })
export class CourseAttendanceEntity extends BaseIdEntity {
  constructor(attr?: Partial<CourseAttendanceEntity>) {
    super(attr);
  }

  @ApiProperty({ type: () => CourseEntity })
  @ManyToOne('CourseEntity')
  @JoinColumn()
  course: CourseEntity;
  @ApiProperty()
  @Column()
  courseId: number;

  @ApiProperty({ type: () => CompanyMemberEntity })
  @ManyToOne('CompanyMemberEntity', { onDelete: 'CASCADE' })
  @JoinColumn()
  companyMember: CompanyMemberEntity;
  @ApiProperty()
  @Column()
  companyMemberId: number;
}
