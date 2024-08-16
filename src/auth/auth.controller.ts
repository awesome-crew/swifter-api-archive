import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from '@/modules/user/users/users.service';

import { JwtToken } from './domain';
import { SigninDto } from './dtos';
import {
  PasswordNotMatchedException,
  UserNotFoundByCodeException,
} from './exceptions';

import { AuthService } from './auth.service';

@ApiTags('인증')
@ApiResponse({ type: JwtToken })
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'ID(code), password 기반 로그인' })
  @Post('/signin')
  async signin(@Body() { code, password }: SigninDto) {
    const user = await this.userService.findByCode(code);

    if (user == null) {
      throw new UserNotFoundByCodeException();
    }

    if (user.comparePassword(password) === false) {
      throw new PasswordNotMatchedException();
    }

    return this.service.createJwt(user.id, user.companyId);
  }
}
