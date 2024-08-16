import { ApiProperty } from '@nestjs/swagger';

import { PeriodDto } from '@/common/dtos';

export class CourseMetadataResponseDto {
  @ApiProperty({
    type: PeriodDto,
  })
  readonly learningPeriod: PeriodDto | null;

  @ApiProperty({ description: '전체 레슨 수' })
  readonly totalLessonCount: number;

  @ApiProperty({ description: '진행된 레슨 수' })
  readonly passedLessonCount: number;

  @ApiProperty({ description: '수강자 수' })
  readonly attendanceCount: number;

  @ApiProperty({ description: '전송 횟수' })
  readonly transferCount: number;

  @ApiProperty({ description: '응답 횟수' })
  readonly answerCount: number;

  @ApiProperty({ description: '정답 횟수' })
  readonly correctCount: number;
}
