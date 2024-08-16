import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateCompanyMemberDto } from './create-company-member.dto';

export class BulkUpsertCompanyMemberDto {
  @ApiProperty({ type: () => [CreateCompanyMemberDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCompanyMemberDto)
  companyMembers: CreateCompanyMemberDto[];
}
