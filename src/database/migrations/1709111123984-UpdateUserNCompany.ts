import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserNCompany1709111123984 implements MigrationInterface {
  name = 'UpdateUserNCompany1709111123984';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`position\``);
    await queryRunner.query(
      `ALTER TABLE \`company\` ADD \`address\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company\` ADD \`phoneNumber\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`phoneNumber\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumber\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    await queryRunner.query(
      `ALTER TABLE \`company\` DROP COLUMN \`phoneNumber\``,
    );
    await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`address\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`position\` varchar(255) NOT NULL`,
    );
  }
}
