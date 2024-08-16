import { BaseException } from '@awesome-dev/server-common';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundByCodeException extends BaseException {
  constructor() {
    super({
      code: 'USER_NOT_FOUND_BY_CODE',
      message: '입력된 코드와 일치하는 유저가 없습니다',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
