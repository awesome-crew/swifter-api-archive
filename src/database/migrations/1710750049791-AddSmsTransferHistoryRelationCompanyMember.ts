import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSmsTransferHistoryRelationCompanyMember1710750049791
  implements MigrationInterface
{
  name = 'AddSmsTransferHistoryRelationCompanyMember1710750049791';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD \`companyMemberId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD CONSTRAINT \`FK_2e2c7c06974665789710e8d8e02\` FOREIGN KEY (\`companyMemberId\`) REFERENCES \`company_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` DROP FOREIGN KEY \`FK_2e2c7c06974665789710e8d8e02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` DROP COLUMN \`companyMemberId\``,
    );
  }
}
