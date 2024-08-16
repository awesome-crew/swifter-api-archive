import { BaseIdEntity } from '@awesome-dev/server-common';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from '@awesome-dev/server-typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { CourseEntity } from '../../courses/entities';
import { LessonQuestionEntity } from './lesson-question.entity';

@Entity({ name: 'lesson' })
export class LessonEntity extends BaseIdEntity {
  constructor(attr?: Partial<LessonEntity>) {
    super(attr);
  }

  @ApiProperty({ type: () => CourseEntity })
  @ManyToOne('CourseEntity')
  @JoinColumn()
  course: CourseEntity;
  @ApiProperty()
  @Column()
  courseId: number;

  @OneToMany('LessonQuestionEntity', 'lesson', { cascade: true })
  questions: LessonQuestionEntity[];

  @ApiProperty()
  @Column()
  title: string;
  @ApiProperty()
  @Column()
  imageUrl: string;
  @ApiProperty()
  @Column()
  description: string;
  @ApiProperty()
  @Column()
  order: number;
}
