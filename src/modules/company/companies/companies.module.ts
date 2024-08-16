import { TypeOrmModule } from '@awesome-dev/server-typeorm';
import { Module } from '@nestjs/common';

import { CompanyRepository } from './repositories';

import { CompanyService } from './company.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository])],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompaniesModule {}
