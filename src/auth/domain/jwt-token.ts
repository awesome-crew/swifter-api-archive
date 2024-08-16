import { ApiProperty } from '@nestjs/swagger';

export class JwtToken {
  @ApiProperty()
  access: string;
  @ApiProperty()
  refresh: string;
}
