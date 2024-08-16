import { TypeOrmModule } from '@awesome-dev/server-typeorm';
import { Module } from '@nestjs/common';

import { CoursesModule } from '@/modules/course/courses/courses.module';
import { CompanyMemberRepository } from './repositories';

import { CompanyMemberService } from './company-member.service';
import { CompanyMembersController } from './company-members.controller';
import { SmsTransferHistoriesModule } from '@/modules/course/sms-transfer-histories/sms-transfer-histories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyMemberRepository]),
    CoursesModule,
    SmsTransferHistoriesModule,
  ],
  controllers: [CompanyMembersController],
  providers: [CompanyMemberService],
  exports: [CompanyMemberService],
})
export class CompanyMembersModule {}
