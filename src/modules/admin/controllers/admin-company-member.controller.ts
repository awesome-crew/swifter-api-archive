import {
  AdminController,
  BaseAdminController,
} from '@awesome-dev/server-admin';

import { CompanyMemberService } from '@/modules/company/company-members/company-member.service';
import { CompanyMemberEntity } from '@/modules/company/company-members/domain';

@AdminController(CompanyMemberEntity)
export class AdminCompanyMembersController extends BaseAdminController<CompanyMemberEntity> {
  constructor(readonly service: CompanyMemberService) {
    super(service);
  }
}
