import { CurrentUser, VerifyGuard } from '@awesome-dev/server-auth';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtPayload } from '@/auth/interfaces';

import { UserEntity } from './entities';

import { UserService } from './users.service';

@ApiTags('유저')
@Controller('/users')
export class UsersController {
  constructor(private readonly service: UserService) {}

  @ApiResponse({ type: [UserEntity] })
  @Get('/')
  list() {
    return this.service.list();
  }

  @ApiOperation({ summary: '내 정보 조회' })
  @ApiResponse({ type: UserEntity })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Get('/me')
  me(@CurrentUser() { sub: userId }: JwtPayload) {
    return this.service.get(userId, ['company']);
  }
}
