import { BaseService } from '@awesome-dev/server-common';
import { Injectable } from '@nestjs/common';

import { CompanyEntity } from './domain';
import { CompanyRepository } from './repositories';

@Injectable()
export class CompanyService extends BaseService<CompanyEntity> {
  constructor(readonly repository: CompanyRepository) {
    super();
  }
}
