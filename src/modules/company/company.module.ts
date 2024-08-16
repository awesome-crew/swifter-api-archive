import { Module } from '@nestjs/common';

import { CompaniesModule } from './companies/companies.module';
import { CompanyMembersModule } from './company-members/company-members.module';

@Module({
  imports: [CompaniesModule, CompanyMembersModule],
})
export class CompanyModule {}
