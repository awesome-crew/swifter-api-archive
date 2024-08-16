import { BaseService } from '@awesome-dev/server-common';
import { Injectable } from '@nestjs/common';

import { CourseAttendanceEntity } from './entities';
import { CourseAttendanceRepository } from './repositories';

@Injectable()
export class CourseAttendanceService extends BaseService<CourseAttendanceEntity> {
  constructor(readonly repository: CourseAttendanceRepository) {
    super();
  }

  async getCourseIds(companyMemberId: number) {
    const entities = await this.repository.find({
      select: ['courseId'],
      where: { companyMemberId },
    });

    return entities.map((entity) => entity.courseId);
  }

  async bulkInsert(courseId: number, companyMemberIds: number[]) {
    const entities = companyMemberIds.map((companyMemberId) => ({
      courseId,
      companyMemberId,
    }));

    await this.repository.insert(entities);
  }
}
