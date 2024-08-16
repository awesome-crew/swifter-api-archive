import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSmsTransferHistory1710745248434 implements MigrationInterface {
  name = 'AddSmsTransferHistory1710745248434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`sms_transfer_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`type\` enum ('CONTENT', 'QUESTION') NOT NULL, \`status\` enum ('SEND_FAILED', 'NOT_ANSWERED', 'CORRECT', 'INCORRECT') NOT NULL DEFAULT 'NOT_ANSWERED', \`sentAt\` datetime NULL, \`answerText\` varchar(255) NULL, \`answeredAt\` datetime NULL, \`wasCorrectAnswer\` tinyint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_transfer_schedule\` ADD \`status\` enum ('PENDING', 'TRANSFERRED') NOT NULL DEFAULT 'PENDING'`,
    );
    await queryRunner.query(
      `CREATE INDEX \`idx_status\` ON \`lesson_transfer_schedule\` (\`status\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`idx_status\` ON \`lesson_transfer_schedule\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_transfer_schedule\` DROP COLUMN \`status\``,
    );
    await queryRunner.query(`DROP TABLE \`sms_transfer_history\``);
  }
}
