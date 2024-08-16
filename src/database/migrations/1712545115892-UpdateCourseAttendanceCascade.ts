import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCourseAttendanceCascade1712545115892
  implements MigrationInterface
{
  name = 'UpdateCourseAttendanceCascade1712545115892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`course_attendance\` DROP FOREIGN KEY \`FK_be4fdcd5a44e42d3eb85305b379\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`course_attendance\` ADD CONSTRAINT \`FK_be4fdcd5a44e42d3eb85305b379\` FOREIGN KEY (\`companyMemberId\`) REFERENCES \`company_member\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`course_attendance\` DROP FOREIGN KEY \`FK_be4fdcd5a44e42d3eb85305b379\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`course_attendance\` ADD CONSTRAINT \`FK_be4fdcd5a44e42d3eb85305b379\` FOREIGN KEY (\`companyMemberId\`) REFERENCES \`company_member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
