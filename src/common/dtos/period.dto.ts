import { ApiProperty } from '@nestjs/swagger';

export class PeriodDto {
  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;
}
