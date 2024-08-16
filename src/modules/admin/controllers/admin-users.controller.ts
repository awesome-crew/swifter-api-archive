import {
  AdminController,
  BaseAdminController,
} from '@awesome-dev/server-admin';
import { Body, Post } from '@nestjs/common';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { UserEntity } from '@/modules/user/users/entities';
import { UserService } from '@/modules/user/users/users.service';

class RegisterUserDto extends PickType(UserEntity, [
  'code',
  'name',
  'email',
  'phoneNumber',
  'companyId',
]) {
  @ApiProperty()
  @IsString()
  password: string;
}

@AdminController(UserEntity)
export class AdminUsersController extends BaseAdminController<UserEntity> {
  constructor(readonly service: UserService) {
    super(service);
  }

  @Post('/register')
  async register(@Body() { password, ...body }: RegisterUserDto) {
    const created = await this.service.create(body);

    return await this.service.updatePassword(created.id, password);
  }
}
