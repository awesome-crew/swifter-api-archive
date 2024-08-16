import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ListOptions, formatSeoulDate } from '@awesome-dev/server-common';
import { LessThan } from '@awesome-dev/server-typeorm';

import { CourseDeployStatus } from '../courses/entities';

import {
  LessonTransferScheduleEntity,
  LessonTransferScheduleStatus,
} from './domain';

import { LessonTransferScheduleService } from './lesson-transfer-schedule.service';

@Injectable()
export class LessonTransferScheduler {
  constructor(readonly service: LessonTransferScheduleService) {}

  @Cron('0 * * * * *')
  async transfer() {
    const date = formatSeoulDate('yyyy-MM-dd');
    const time = formatSeoulDate('HH:mm:ss');

    const targetSchedules = await this.service.list(
      new ListOptions<LessonTransferScheduleEntity>()
        .where({
          status: LessonTransferScheduleStatus.PENDING,
          date,
          course: {
            deployStatus: CourseDeployStatus.DEPLOYING,
            deployTime: LessThan(time),
          },
        })
        .relation(['course']),
    );

    for (const schedule of targetSchedules) {
      await this.service.transfer(schedule.id);
    }
  }
}
