import { PickType } from '@nestjs/swagger';

import { CompanyMemberEntity } from '../domain';

export class CreateCompanyMemberDto extends PickType(CompanyMemberEntity, [
  'name',
  'position',
  'team',
  'phoneNumber',
]) {}
