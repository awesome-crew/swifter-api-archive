import {
  AdminController,
  BaseAdminController,
} from '@awesome-dev/server-admin';

import { CompanyService } from '@/modules/company/companies/company.service';
import { CompanyEntity } from '@/modules/company/companies/domain';

@AdminController(CompanyEntity)
export class AdminCompanysController extends BaseAdminController<CompanyEntity> {
  constructor(readonly service: CompanyService) {
    super(service);
  }
}
