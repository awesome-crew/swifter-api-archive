import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnNames1710817920908 implements MigrationInterface {
  name = 'UpdateColumnNames1710817920908';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` DROP FOREIGN KEY \`FK_3760a0e2da15d8c8647ae044874\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` DROP COLUMN \`lessionQuestionId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD \`lessonQuestionId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD \`lessonQuestionChoiceId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD CONSTRAINT \`FK_01224a54ca32f8772c18cec7ae8\` FOREIGN KEY (\`lessonQuestionId\`) REFERENCES \`lesson_question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD CONSTRAINT \`FK_11694cdf28db34964983dec75be\` FOREIGN KEY (\`lessonQuestionChoiceId\`) REFERENCES \`lesson_question_choice\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` DROP FOREIGN KEY \`FK_11694cdf28db34964983dec75be\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` DROP FOREIGN KEY \`FK_01224a54ca32f8772c18cec7ae8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` DROP COLUMN \`lessonQuestionChoiceId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` DROP COLUMN \`lessonQuestionId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD \`lessionQuestionId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD CONSTRAINT \`FK_3760a0e2da15d8c8647ae044874\` FOREIGN KEY (\`lessionQuestionId\`) REFERENCES \`lesson_question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
