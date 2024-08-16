import { MigrationInterface, QueryRunner } from '@awesome-dev/server-typeorm';

export class AddCourseRelatedTables1708939896442 implements MigrationInterface {
  name = 'AddCourseRelatedTables1708939896442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_b5dfd29338b3996c9d2a6a4b3e0\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`course_attendance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`courseId\` int NOT NULL, \`companyMemberId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`lesson\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`courseId\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`order\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`lesson_question\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`courseId\` int NOT NULL, \`lessonId\` int NOT NULL, \`type\` enum ('FREE_ANSWER', 'MULTIPLE_CHOICE') NOT NULL, \`order\` int NOT NULL, \`freeAnswerContent\` varchar(255) NULL, \`freeAnswerFeedback\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`lesson_question_choice\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`questionId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`course\` ADD CONSTRAINT \`FK_b5dfd29338b3996c9d2a6a4b3e0\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`course_attendance\` ADD CONSTRAINT \`FK_d0e0b645b12fc985c254bb2d76f\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`course_attendance\` ADD CONSTRAINT \`FK_be4fdcd5a44e42d3eb85305b379\` FOREIGN KEY (\`companyMemberId\`) REFERENCES \`company_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson\` ADD CONSTRAINT \`FK_3801ccf9533a8627c1dcb1e33bf\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_question\` ADD CONSTRAINT \`FK_fee782ebe0095304c04cb4a3ec9\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_question\` ADD CONSTRAINT \`FK_184711f885c46a799e9efc34a36\` FOREIGN KEY (\`lessonId\`) REFERENCES \`lesson\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_question_choice\` ADD CONSTRAINT \`FK_3d16917edbd4c8365897212fa68\` FOREIGN KEY (\`questionId\`) REFERENCES \`lesson_question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`lesson_question_choice\` DROP FOREIGN KEY \`FK_3d16917edbd4c8365897212fa68\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_question\` DROP FOREIGN KEY \`FK_184711f885c46a799e9efc34a36\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_question\` DROP FOREIGN KEY \`FK_fee782ebe0095304c04cb4a3ec9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson\` DROP FOREIGN KEY \`FK_3801ccf9533a8627c1dcb1e33bf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`course_attendance\` DROP FOREIGN KEY \`FK_be4fdcd5a44e42d3eb85305b379\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`course_attendance\` DROP FOREIGN KEY \`FK_d0e0b645b12fc985c254bb2d76f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_b5dfd29338b3996c9d2a6a4b3e0\``,
    );
    await queryRunner.query(`DROP TABLE \`lesson_question_choice\``);
    await queryRunner.query(`DROP TABLE \`lesson_question\``);
    await queryRunner.query(`DROP TABLE \`lesson\``);
    await queryRunner.query(`DROP TABLE \`course_attendance\``);
    await queryRunner.query(
      `ALTER TABLE \`course\` ADD CONSTRAINT \`FK_b5dfd29338b3996c9d2a6a4b3e0\` FOREIGN KEY (\`companyId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
