import { MigrationInterface, QueryRunner } from '@awesome-dev/server-typeorm';

export class UpdateCourse1708938736989 implements MigrationInterface {
  name = 'UpdateCourse1708938736989';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`course\` CHANGE \`status\` \`deployStatus\` enum ('CREATING', 'DEPLOYING', 'STOP', 'FINISHED') NOT NULL DEFAULT 'CREATING'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`course\` CHANGE \`deployStatus\` \`deployStatus\` enum ('PENDING', 'DEPLOYING', 'DEPLOYED') NOT NULL DEFAULT 'PENDING'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`course\` CHANGE \`deployStatus\` \`deployStatus\` enum ('CREATING', 'DEPLOYING', 'STOP', 'FINISHED') NOT NULL DEFAULT 'CREATING'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`course\` CHANGE \`deployStatus\` \`status\` enum ('CREATING', 'DEPLOYING', 'STOP', 'FINISHED') NOT NULL DEFAULT 'CREATING'`,
    );
  }
}
