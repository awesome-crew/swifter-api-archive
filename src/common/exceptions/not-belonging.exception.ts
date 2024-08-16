import { BaseException } from '@awesome-dev/server-common';
import { HttpStatus } from '@nestjs/common';

export class NotBelongingException extends BaseException {
  constructor(targetId: number, companyId: number) {
    super({
      code: 'NOT_BELONGING',
      message: `본인 회사의 객체에만 접근할 수 있습니다 (targetId: ${targetId}, companyId: ${companyId})`,
      status: HttpStatus.FORBIDDEN,
    });
  }
}
