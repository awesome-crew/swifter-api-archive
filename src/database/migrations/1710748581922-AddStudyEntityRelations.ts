import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStudyEntityRelations1710748581922
  implements MigrationInterface
{
  name = 'AddStudyEntityRelations1710748581922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`lesson_transfer_schedule\` ADD \`courseId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_transfer_schedule\` ADD \`lessonId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD \`courseId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD \`lessonId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD \`lessionQuestionId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_transfer_schedule\` ADD CONSTRAINT \`FK_26ac9f4f04be5206525e46a22df\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_transfer_schedule\` ADD CONSTRAINT \`FK_5fadf980654bbe70279968238c1\` FOREIGN KEY (\`lessonId\`) REFERENCES \`lesson\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD CONSTRAINT \`FK_38f9b53b74f47fc189f0761bebc\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` ADD CONSTRAINT \`FK_1a63303c89a24bf3a258179d7a6\` FOREIGN KEY (\`lessonId\`) REFERENCES \`lesson\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`sms_transfer_history\` DROP FOREIGN KEY \`FK_1a63303c89a24bf3a258179d7a6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` DROP FOREIGN KEY \`FK_38f9b53b74f47fc189f0761bebc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_transfer_schedule\` DROP FOREIGN KEY \`FK_5fadf980654bbe70279968238c1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_transfer_schedule\` DROP FOREIGN KEY \`FK_26ac9f4f04be5206525e46a22df\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` DROP COLUMN \`lessionQuestionId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` DROP COLUMN \`lessonId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sms_transfer_history\` DROP COLUMN \`courseId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_transfer_schedule\` DROP COLUMN \`lessonId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_transfer_schedule\` DROP COLUMN \`courseId\``,
    );
  }
}
