import { Column } from '@awesome-dev/server-typeorm';
import * as bcrypt from 'bcryptjs';

export class UserPasswordEntity {
  constructor(attrs?: Partial<UserPasswordEntity>) {
    Object.assign(this, attrs);
  }

  @Column({ nullable: true })
  salt: string;
  @Column({ nullable: true })
  encrypted: string;
  @Column({ type: 'datetime', nullable: true })
  createdAt!: Date;

  public static of(password: string): UserPasswordEntity {
    const salt = bcrypt.genSaltSync();
    return new UserPasswordEntity({
      salt,
      encrypted: bcrypt.hashSync(password, salt),
      createdAt: new Date(),
    });
  }

  compare(password: string): boolean {
    if (!this.encrypted) {
      return true;
    }

    return bcrypt.compareSync(password, this.encrypted);
  }
}
