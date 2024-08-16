import { BaseIdEntity } from '@awesome-dev/server-common';
import { Column, Entity } from '@awesome-dev/server-typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'company' })
export class CompanyEntity extends BaseIdEntity {
  constructor(attr?: Partial<CompanyEntity>) {
    super(attr);
  }

  @ApiProperty()
  @Column()
  name: string;
  @ApiProperty()
  @Column()
  address: string;
  @ApiProperty()
  @Column()
  phoneNumber: string;
}
