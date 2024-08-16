import { BaseIdEntity } from '@awesome-dev/server-common';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from '@awesome-dev/server-typeorm';
import { ValueOf } from '@awesome-dev/typings';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsString } from 'class-validator';

import { CompanyMemberEntity } from '@/modules/company/company-members/domain';

import { CourseEntity } from '../../courses/entities';
import {
  LessonEntity,
  LessonQuestionChoiceEntity,
  LessonQuestionEntity,
} from '../../lessons/entities';

export const SmsTransferType = {
  CONTENT: 'CONTENT',
  QUESTION: 'QUESTION',
} as const;
export type SmsTransferType = ValueOf<typeof SmsTransferType>;

export const SmsTransferStatus = {
  SEND_FAILED: 'SEND_FAILED',
  NOT_ANSWERED: 'NOT_ANSWERED',
  ANSWERED: 'ANSWERED',
} as const;
export type SmsTrasferStatus = ValueOf<typeof SmsTransferStatus>;

@Entity({ name: 'sms_transfer_history' })
export class SmsTransferHistoryEntity extends BaseIdEntity {
  constructor(attr?: Partial<SmsTransferHistoryEntity>) {
    super(attr);
  }
  @ApiProperty({ type: () => CompanyMemberEntity })
  @ManyToOne('CompanyMemberEntity')
  @JoinColumn()
  companyMember: CompanyMemberEntity;
  @ApiProperty()
  @Column()
  companyMemberId: number;
  @ApiProperty({ type: () => CourseEntity })
  @ManyToOne('CourseEntity')
  @JoinColumn()
  course: CourseEntity;
  @ApiProperty()
  @Column()
  courseId: number;
  @ApiProperty({ type: () => LessonEntity })
  @ManyToOne('LessonEntity')
  @JoinColumn()
  lesson: LessonEntity;
  @ApiProperty()
  @Column()
  lessonId: number;
  @ApiProperty({ type: () => LessonQuestionEntity })
  @ManyToOne('LessonQuestionEntity')
  @JoinColumn()
  lessonQuestion: LessonQuestionEntity;
  @ApiProperty()
  @Column({ nullable: true })
  lessonQuestionId: number;
  @ApiProperty({ type: () => LessonQuestionChoiceEntity })
  @ManyToOne('LessonQuestionChoiceEntity')
  @JoinColumn()
  lessonQuestionChoice: LessonQuestionChoiceEntity;
  @ApiProperty()
  @Column({ nullable: true })
  lessonQuestionChoiceId: number | null;

  @ApiProperty({
    enum: SmsTransferType,
  })
  @IsEnum(SmsTransferType)
  @Column({ type: 'enum', enum: SmsTransferType })
  type: SmsTransferType;
  @ApiProperty({
    enum: SmsTransferStatus,
  })
  @IsEnum(SmsTransferStatus)
  @Column({
    type: 'enum',
    enum: SmsTransferStatus,
    default: SmsTransferStatus.NOT_ANSWERED,
  })
  status: SmsTrasferStatus;

  @ApiProperty()
  @Column({ nullable: true })
  sentAt: Date;

  @ApiProperty()
  @IsString()
  @Column({ nullable: true })
  answerText: string;
  @ApiProperty()
  @Column({ nullable: true })
  answeredAt: Date;
  @ApiProperty()
  @IsBoolean()
  @Column({ nullable: true })
  wasCorrectAnswer: boolean;
}
