import { BaseException } from '@awesome-dev/server-common';
import { HttpStatus } from '@nestjs/common';

export class NotAttendingCourseException extends BaseException {
  constructor(companyMemberId: number, courseId: number) {
    super({
      code: 'NOT_ATTENDINGCOURSE',
      message: `코스에 해당 참여자가 존재하지 않습니다. (companyMemberId: ${companyMemberId}, courseId: ${courseId})`,
      status: HttpStatus.FORBIDDEN,
    });
  }
}
