import { BaseException } from '@awesome-dev/server-common';
import { HttpStatus } from '@nestjs/common';

export class PasswordNotMatchedException extends BaseException {
  constructor() {
    super({
      code: 'PASSWORD_NOT_MATCHED',
      message: '비밀번호가 일치하지 않습니다',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
