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

import { CourseEntity } from '../../courses/entities';

import { LessonEntity } from './lesson.entity';
import { LessonQuestionChoiceEntity } from './lesson-question-choice.entity';

export const LessonQuestionType = {
  FREE_ANSWER: 'FREE_ANSWER',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
} as const;
export type LessonQuestionType = ValueOf<typeof LessonQuestionType>;

@Entity({ name: 'lesson_question' })
export class LessonQuestionEntity extends BaseIdEntity {
  constructor(attr?: Partial<LessonQuestionEntity>) {
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

  @ApiProperty({ type: () => [LessonQuestionChoiceEntity] })
  @OneToMany('LessonQuestionChoiceEntity', 'question', { cascade: true })
  choices: LessonQuestionChoiceEntity[];

  @ApiProperty({ enum: LessonQuestionType })
  @IsEnum(LessonQuestionType)
  @Column({ type: 'enum', enum: LessonQuestionType })
  type: LessonQuestionType;

  @ApiProperty()
  @Column()
  order: number;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  content: string;
  @ApiProperty({ required: false })
  @Column({ nullable: true })
  freeAnswerFeedback: string;
}
