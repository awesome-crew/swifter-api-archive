import { ApiProperty } from '@nestjs/swagger';

export class CompanyMemberMetadataResponseDto {
  @ApiProperty()
  courseId: number;

  @ApiProperty({ description: '전송 횟수' })
  transferCount: number;

  @ApiProperty({ description: '응답 횟수' })
  answerCount: number;

  @ApiProperty({ description: '정답 횟수' })
  correctCount: number;
}
