import { BaseService, ListOptions } from '@awesome-dev/server-common';
import { In } from '@awesome-dev/server-typeorm';
import { Injectable } from '@nestjs/common';

import {
  NotAttendingCourseException,
  NotBelongingException,
} from '@/common/exceptions';
import { CourseAttendanceService } from '@/modules/course/courses/course-attendance.service';
import { CourseEntity } from '@/modules/course/courses/entities';
import { CoursesService } from '@/modules/course/courses/courses.service';
import { SmsTransferHistoryService } from '@/modules/course/sms-transfer-histories/sms-transfer-history.service';

import { CompanyMemberEntity } from './domain';
import { CompanyMemberRepository } from './repositories';

@Injectable()
export class CompanyMemberService extends BaseService<CompanyMemberEntity> {
  constructor(
    readonly repository: CompanyMemberRepository,

    readonly courseAttendanceService: CourseAttendanceService,
    readonly coursesService: CoursesService,
    readonly smsTransferHistoryService: SmsTransferHistoryService,
  ) {
    super();
  }

  async assertBelongsTo(idOrIds: number | number[], companyId: number) {
    const ids = typeof idOrIds === 'number' ? [idOrIds] : idOrIds;

    const members = await this.repository.find({
      select: ['id', 'companyId'],
      where: { id: In(ids) },
    });

    for (const member of members) {
      if (member.companyId !== companyId) {
        throw new NotBelongingException(member.id, companyId);
      }
    }
  }

  async assertAttendingCourse(id: number, courseId: number) {
    const courseIds = await this.getAttendingCourseIds(id);

    if (!courseIds.includes(courseId)) {
      throw new NotAttendingCourseException(id, courseId);
    }
  }

  async upsert(
    payload: Pick<
      CompanyMemberEntity,
      'companyId' | 'name' | 'phoneNumber' | 'team' | 'position'
    >,
  ) {
    const { name, phoneNumber } = payload;

    const existing = await this.findOne({ where: { name, phoneNumber } });

    if (existing != null) {
      return existing.equals(payload)
        ? existing
        : this.update(existing.id, payload);
    } else {
      return this.create(payload);
    }
  }

  async getByPhoneNumber(phoneNumber: string) {
    return this.findOne({ where: { phoneNumber } });
  }

  async listAttendingCourses(
    id: number,
    listOptions?: ListOptions<CourseEntity>,
  ) {
    const courseIds = await this.getAttendingCourseIds(id);

    return this.coursesService.list(
      ListOptions.from(listOptions).where({ id: In(courseIds) }),
    );
  }

  getAttendingCourseIds(id: number) {
    return this.courseAttendanceService.getCourseIds(id);
  }

  async getCourseMetadata(id: number, courseId: number) {
    const transferCount = await this.coursesService.getTransferCount(
      courseId,
      id,
    );
    const answerCount = await this.coursesService.getAnswerCount(courseId, id);
    const correctCount = await this.coursesService.getCorrectCount(
      courseId,
      id,
    );

    return {
      courseId,
      transferCount,
      answerCount,
      correctCount,
    };
  }

  getSmsTransferHistory(id: number, lessonQuestionId: number) {
    return this.smsTransferHistoryService.findOne({
      where: { companyMemberId: id, lessonQuestionId: lessonQuestionId },
    });
  }
}
