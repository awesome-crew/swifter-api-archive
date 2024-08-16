import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({ description: 'ID' })
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  password: string;
}
