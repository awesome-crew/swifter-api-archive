import { MigrationInterface, QueryRunner } from 'typeorm';

export class Update1710781241265 implements MigrationInterface {
  name = 'Update1710781241265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`lesson_question\` CHANGE\`freeAnswerContent\` \`content\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` CHANGE \`status\` \`status\` enum ('SEND_FAILED', 'NOT_ANSWERED', 'ANSWERED') NOT NULL DEFAULT 'NOT_ANSWERED'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` CHANGE \`status\` \`status\` enum ('SEND_FAILED', 'NOT_ANSWERED', 'CORRECT', 'INCORRECT') NOT NULL DEFAULT 'NOT_ANSWERED'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_question\` CHANGE \`content\` \`freeAnswerContent\` varchar(255) NULL`,
    );
  }
}
