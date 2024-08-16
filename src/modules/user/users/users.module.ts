import { TypeOrmModule } from '@awesome-dev/server-typeorm';
import { Module } from '@nestjs/common';

import { UserRepository } from './repositories';

import { UsersController } from './users.controler';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
