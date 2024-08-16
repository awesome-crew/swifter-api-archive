import { BaseRepository } from '@awesome-dev/server-common';
import { UserEntity } from '../entities/user.entity';
import { CustomRepository } from '@awesome-dev/server-typeorm';

@CustomRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {}
