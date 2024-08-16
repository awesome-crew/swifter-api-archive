import { MigrationInterface, QueryRunner } from '@awesome-dev/server-typeorm';

export class UpdateQuestionChoice1708942302628 implements MigrationInterface {
  name = 'UpdateQuestionChoice1708942302628';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`lesson_question_choice\` ADD \`content\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_question_choice\` ADD \`isAnswer\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_question_choice\` ADD \`feedback\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`lesson_question_choice\` DROP COLUMN \`feedback\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_question_choice\` DROP COLUMN \`isAnswer\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_question_choice\` DROP COLUMN \`content\``,
    );
  }
}
