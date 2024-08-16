import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMissingNullable1710748654576 implements MigrationInterface {
  name = 'AddMissingNullable1710748654576';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` DROP FOREIGN KEY \`FK_3760a0e2da15d8c8647ae044874\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` CHANGE \`lessionQuestionId\` \`lessionQuestionId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD CONSTRAINT \`FK_3760a0e2da15d8c8647ae044874\` FOREIGN KEY (\`lessionQuestionId\`) REFERENCES \`lesson_question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` DROP FOREIGN KEY \`FK_3760a0e2da15d8c8647ae044874\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` CHANGE \`lessionQuestionId\` \`lessionQuestionId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD CONSTRAINT \`FK_3760a0e2da15d8c8647ae044874\` FOREIGN KEY (\`lessionQuestionId\`) REFERENCES \`lesson_question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
