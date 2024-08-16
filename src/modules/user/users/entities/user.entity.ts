import { BaseIdEntity } from '@awesome-dev/server-common';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from '@awesome-dev/server-typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { CompanyEntity } from '@/modules/company/companies/domain';

import { UserPasswordEntity } from './user-password.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseIdEntity {
  constructor(attr?: Partial<UserEntity>) {
    super(attr);
  }

  @ApiProperty({ type: () => CompanyEntity })
  @ManyToOne('CompanyEntity', { onDelete: 'RESTRICT' })
  @JoinColumn()
  company: CompanyEntity;
  @ApiProperty()
  @Column()
  companyId: number;

  @ApiProperty()
  @Column()
  code: string;
  @Column(() => UserPasswordEntity)
  password: UserPasswordEntity;

  @ApiProperty()
  @Column()
  name: string;
  @ApiProperty()
  @Column()
  email: string;
  @ApiProperty()
  @Column()
  phoneNumber: string;

  updatePassword(input: string) {
    this.password = UserPasswordEntity.of(input);
    return this;
  }

  comparePassword(password: string) {
    return this.password == null ? true : this.password.compare(password);
  }
}
