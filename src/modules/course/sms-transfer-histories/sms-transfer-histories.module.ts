import { TypeOrmModule } from '@awesome-dev/server-typeorm';
import { Module, forwardRef } from '@nestjs/common';

import { CompanyMembersModule } from '@/modules/company/company-members/company-members.module';

import { LessonsModule } from '../lessons/lessons.module';

import { SmsTransferHistoryRepository } from './repositories';

import { SmsTransferHistoryService } from './sms-transfer-history.service';
import { SmsTransferListener } from './sms-transfer.listener';
import { SmsTransferController } from './sms-transfer.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SmsTransferHistoryRepository]),
    forwardRef(() => CompanyMembersModule),
    forwardRef(() => LessonsModule),
  ],
  controllers: [SmsTransferController],
  providers: [SmsTransferHistoryService, SmsTransferListener],
  exports: [SmsTransferHistoryService],
})
export class SmsTransferHistoriesModule {}
