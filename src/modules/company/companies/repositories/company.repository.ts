import { BaseRepository } from '@awesome-dev/server-common';
import { CustomRepository } from '@awesome-dev/server-typeorm';

import { CompanyEntity } from '../domain';

@CustomRepository(CompanyEntity)
export class CompanyRepository extends BaseRepository<CompanyEntity> {}
