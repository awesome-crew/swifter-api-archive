import { BaseService } from '@awesome-dev/server-common';
import { Injectable } from '@nestjs/common';

import { LessonService } from '../lessons/lesson.service';

import {
  LessonTransferScheduleEntity,
  LessonTransferScheduleStatus,
} from './domain';
import { LessonTransferScheduleRepository } from './repositories';

@Injectable()
export class LessonTransferScheduleService extends BaseService<LessonTransferScheduleEntity> {
  constructor(
    readonly repository: LessonTransferScheduleRepository,
    private readonly lessonService: LessonService,
  ) {
    super();
  }

  async transfer(id: number) {
    const entity = await this.get(id, [
      'course',
      'course.attendances',
      'course.attendances.companyMember',
    ]);

    if (entity?.status !== LessonTransferScheduleStatus.PENDING) {
      return;
    }

    for (const attendance of entity.course.attendances) {
      await this.lessonService.transfer(
        entity.lessonId,
        attendance.companyMember,
      );
    }

    await this.repository.update(id, {
      status: LessonTransferScheduleStatus.TRANSFERRED,
    });
  }

  async updateOrCreate(
    ele: Pick<LessonTransferScheduleEntity, 'lessonId' | 'date'>,
    courseId: number,
  ) {
    const entity = await this.repository.findOneBy({ lessonId: ele.lessonId });

    if (entity != null) {
      return this.update(entity.id, { date: ele.date });
    } else {
      return this.create({ ...ele, courseId });
    }
  }
}
