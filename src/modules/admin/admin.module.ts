import { AwesomeAdminModule } from '@awesome-dev/server-admin';
import { Module } from '@nestjs/common';

import { CompanyMembersModule } from '../company/company-members/company-members.module';
import { CompaniesModule } from '../company/companies/companies.module';
import { CoursesModule } from '../course/courses/courses.module';
import { LessonTransferSchedulesModule } from '../course/lesson-transfer-schedules/lesson-transfer-schedules.module';
import { LessonsModule } from '../course/lessons/lessons.module';
import { UsersModule } from '../user/users/users.module';

import * as controllers from './controllers';

@Module({
  imports: [
    AwesomeAdminModule.forRoot(),

    CompaniesModule,
    CompanyMembersModule,

    CoursesModule,
    LessonTransferSchedulesModule,
    LessonsModule,

    UsersModule,
  ],
  controllers: [...Object.values(controllers)],
})
export class AdminModule {}
