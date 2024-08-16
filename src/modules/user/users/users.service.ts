import { BaseService } from '@awesome-dev/server-common';
import { Injectable } from '@nestjs/common';

import { UserEntity } from './entities';
import { UserRepository } from './repositories';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(readonly repository: UserRepository) {
    super();
  }

  findByCode(code: string) {
    return this.findOne({ where: { code } });
  }

  async updatePassword(id: number, password: string) {
    const user = await this.get(id);

    if (!user) {
      return;
    }

    user.updatePassword(password);

    return this.repository.save(user);
  }
}
