import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateIndex1710766100313 implements MigrationInterface {
  name = 'UpdateIndex1710766100313';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`idx_status\` ON \`lesson_transfer_schedule\``,
    );
    await queryRunner.query(
      `CREATE INDEX \`idx_status-date\` ON \`lesson_transfer_schedule\` (\`status\`, \`date\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`idx_status-date\` ON \`lesson_transfer_schedule\``,
    );
    await queryRunner.query(
      `CREATE INDEX \`idx_status\` ON \`lesson_transfer_schedule\` (\`status\`)`,
    );
  }
}
