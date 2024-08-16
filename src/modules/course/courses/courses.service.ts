import {
  BaseService,
  ListOptions,
  formatSeoulDate,
} from '@awesome-dev/server-common';
import { In, LessThan, Not } from '@awesome-dev/server-typeorm';
import { Injectable } from '@nestjs/common';

import { NotBelongingException } from '@/common/exceptions';

import { CourseEntity } from './entities';
import { CourseRepository } from './repositories';

import {
  LessonTransferScheduleEntity,
  LessonTransferScheduleStatus,
} from '../lesson-transfer-schedules/domain';
import { LessonTransferScheduleService } from '../lesson-transfer-schedules/lesson-transfer-schedule.service';
import { SmsTransferHistoryService } from '../sms-transfer-histories/sms-transfer-history.service';
import { CourseAttendanceService } from './course-attendance.service';
import {
  SmsTransferHistoryEntity,
  SmsTransferStatus,
  SmsTransferType,
} from '../sms-transfer-histories/domain';

@Injectable()
export class CoursesService extends BaseService<CourseEntity> {
  constructor(
    readonly repository: CourseRepository,
    readonly courseAttendanceService: CourseAttendanceService,
    readonly lessonTransferScheduleService: LessonTransferScheduleService,
    readonly smsTransferHistoryService: SmsTransferHistoryService,
  ) {
    super();
  }

  async assertBelongsTo(idOrIds: number | number[], companyId: number) {
    const ids = typeof idOrIds === 'number' ? [idOrIds] : idOrIds;

    const entities = await this.repository.find({
      select: ['id', 'companyId'],
      where: { id: In(ids) },
    });

    for (const entity of entities) {
      if (entity.companyId !== companyId) {
        throw new NotBelongingException(entity.id, companyId);
      }
    }
  }

  async getLearningPeriod(id: number) {
    const lessonTrnasferSchedules =
      await this.lessonTransferScheduleService.list(
        new ListOptions<LessonTransferScheduleEntity>()
          .where({ courseId: id })
          .order('date'),
      );

    if (lessonTrnasferSchedules.length === 0) {
      return null;
    }

    return {
      startDate: lessonTrnasferSchedules[0].date,
      endDate: lessonTrnasferSchedules[lessonTrnasferSchedules.length - 1].date,
    };
  }

  async getTotalLessonCount(id: number) {
    const course = await this.get(id, ['lessons']);

    if (course == null) {
      return 0;
    }

    return course.lessons.length;
  }

  getPassedLessonCount(id: number) {
    const date = formatSeoulDate('yyyy-MM-dd');

    return this.lessonTransferScheduleService.count(
      new ListOptions({ courseId: id }).where({
        date: LessThan(date),
        status: LessonTransferScheduleStatus.TRANSFERRED,
      }),
    );
  }

  getAttendanceCount(id: number) {
    return this.courseAttendanceService.count(
      new ListOptions({ courseId: id }),
    );
  }

  getTransferCount(id: number, companyMemberId?: number) {
    const smsTransferHistoryListOptions =
      new ListOptions<SmsTransferHistoryEntity>().where({
        courseId: id,
        type: SmsTransferType.QUESTION,
        status: Not(SmsTransferStatus.SEND_FAILED),
      });

    if (companyMemberId != null) {
      smsTransferHistoryListOptions.where({ companyMemberId });
    }
    return this.smsTransferHistoryService.count(smsTransferHistoryListOptions);
  }

  getAnswerCount(id: number, companyMemberId?: number) {
    const smsTransferHistoryListOptions =
      new ListOptions<SmsTransferHistoryEntity>().where({
        courseId: id,
        type: SmsTransferType.QUESTION,
        status: SmsTransferStatus.ANSWERED,
      });

    if (companyMemberId != null) {
      smsTransferHistoryListOptions.where({ companyMemberId });
    }
    return this.smsTransferHistoryService.count(smsTransferHistoryListOptions);
  }

  getCorrectCount(id: number, companyMemberId?: number) {
    const smsTransferHistoryListOptions =
      new ListOptions<SmsTransferHistoryEntity>().where({
        courseId: id,
        type: SmsTransferType.QUESTION,
        status: SmsTransferStatus.ANSWERED,
        wasCorrectAnswer: true,
      });

    if (companyMemberId != null) {
      smsTransferHistoryListOptions.where({ companyMemberId });
    }
    return this.smsTransferHistoryService.count(smsTransferHistoryListOptions);
  }

  async getMetadata(id: number) {
    const course = await this.get(id, ['attendances', 'lessons']);

    if (course == null) {
      return null;
    }

    const learningPeriod = await this.getLearningPeriod(id);

    const totalLessonCount = await this.getTotalLessonCount(id);
    const passedLessonCount = await this.getPassedLessonCount(id);

    const attendanceCount = course.attendances.length;
    const transferCount = await this.getTransferCount(id);
    const answerCount = await this.getAnswerCount(id);
    const correctCount = await this.getCorrectCount(id);

    return {
      learningPeriod,
      totalLessonCount,
      passedLessonCount,
      attendanceCount,
      transferCount,
      answerCount,
      correctCount,
    };
  }
}
