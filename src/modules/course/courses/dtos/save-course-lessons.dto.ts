import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  LessonEntity,
  LessonQuestionChoiceEntity,
  LessonQuestionEntity,
} from '../../lessons/entities';

export class SaveCourseLessonsDto {
  @ApiProperty({ type: () => [LessonPayload] })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => LessonPayload)
  lessons: LessonPayload[];
}

export class LessonPayload extends PartialType(
  PickType(LessonEntity, ['id', 'title', 'imageUrl', 'description', 'order']),
) {
  @ApiProperty({ type: () => [QuestionPayload] })
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  @Type(() => QuestionPayload)
  questions: QuestionPayload[];
}

export class QuestionPayload extends PartialType(
  PickType(LessonQuestionEntity, [
    'id',
    'courseId',
    'type',
    'order',
    'content',
    'freeAnswerFeedback',
  ]),
) {
  @ApiProperty({ type: () => [ChoicePayload] })
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  @Type(() => ChoicePayload)
  choices: ChoicePayload[];
}

export class ChoicePayload extends PartialType(
  PickType(LessonQuestionChoiceEntity, [
    'id',
    'content',
    'isAnswer',
    'feedback',
  ]),
) {}
