import { BaseRepository } from '@awesome-dev/server-common';
import { CustomRepository, In } from '@awesome-dev/server-typeorm';

import { CompanyMemberEntity } from '../domain';

@CustomRepository(CompanyMemberEntity)
export class CompanyMemberRepository extends BaseRepository<CompanyMemberEntity> {
  async checkBelongsTo(ids: number[], companyId: number) {
    const members = await this.find({
      select: ['companyId'],
      where: { id: In(ids) },
    });

    return members.every((x) => x.companyId === companyId);
  }
}
