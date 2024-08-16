import { AllExceptionsFilter } from '@awesome-dev/server-common';
import { AwesomeEventEmitterModule } from '@awesome-dev/server-event-emitter';
import { WhatsappModule } from '@awesome-dev/server-whatsapp';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from '@/auth/auth.module';
import { AppConfigModule } from '@/config/app';

import { AdminModule } from '@/modules/admin/admin.module';
import { CommonModule } from '@/modules/common/common.module';
import { CompanyModule } from '@/modules/company/company.module';
import { CourseModule } from '@/modules/course/course.module';
import { UserModule } from '@/modules/user/user.module';

import { AwsS3ProviderModule } from '@/providers/aws/s3';
import { DatabaseProviderModule } from '@/providers/database';
import { MessagemeProviderModule } from '@/providers/messageme';
import { CacheProviderModule } from '@/providers/cache/redis';

import { AppController } from './app.controller';

@Module({
  imports: [
    AuthModule,
    AppConfigModule,

    AdminModule,
    CommonModule,
    CompanyModule,
    CourseModule,
    UserModule,

    AwsS3ProviderModule,
    DatabaseProviderModule,
    MessagemeProviderModule,
    AwesomeEventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    WhatsappModule.forRoot(),
    CacheProviderModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
