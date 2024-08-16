import { ApiProperty } from '@nestjs/swagger';

class ChoiceAnsweredCountDto {
  @ApiProperty({ description: '선택지 ID' })
  choiceId: number;

  @ApiProperty({ description: '선택지별 응답 수' })
  answerCount: number;
}

export class LessonQuestionMetadataResponseDto {
  @ApiProperty({ description: '전송 횟수' })
  transferCount: number;

  @ApiProperty({ description: '응답 횟수' })
  answerCount: number;

  @ApiProperty({ type: [ChoiceAnsweredCountDto] })
  choiceAnsweredCounts: ChoiceAnsweredCountDto[];
}
