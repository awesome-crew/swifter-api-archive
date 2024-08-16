import { BaseIdEntity } from '@awesome-dev/server-common';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from '@awesome-dev/server-typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { LessonQuestionEntity } from './lesson-question.entity';

@Entity({ name: 'lesson_question_choice' })
export class LessonQuestionChoiceEntity extends BaseIdEntity {
  constructor(attr?: Partial<LessonQuestionChoiceEntity>) {
    super(attr);
  }

  @ApiProperty({ type: () => LessonQuestionEntity })
  @ManyToOne('LessonQuestionEntity', 'choices')
  @JoinColumn()
  question: LessonQuestionEntity;
  @ApiProperty()
  @Column()
  questionId: number;

  @ApiProperty()
  @Column()
  content: string;
  @ApiProperty()
  @Column()
  isAnswer: boolean;
  @ApiProperty()
  @Column()
  feedback: string;
}
