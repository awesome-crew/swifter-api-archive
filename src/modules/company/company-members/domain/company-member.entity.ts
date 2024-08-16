import { BaseIdEntity } from '@awesome-dev/server-common';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from '@awesome-dev/server-typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { CompanyEntity } from '../../companies/domain';

@Entity({ name: 'company_member' })
export class CompanyMemberEntity extends BaseIdEntity {
  constructor(attr?: Partial<CompanyMemberEntity>) {
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
  @IsString()
  @Column()
  name: string;
  @ApiProperty()
  @IsString()
  @Column()
  position: string;
  @ApiProperty()
  @IsString()
  @Column()
  team: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  phoneNumber: string;

  equals(partial: Partial<CompanyMemberEntity>) {
    const compareKeys: Array<keyof CompanyMemberEntity> = [
      'companyId',
      'name',
      'position',
      'team',
      'phoneNumber',
    ];

    return compareKeys.every(
      (key) => partial[key] == null || this[key] === partial[key],
    );
  }
}
