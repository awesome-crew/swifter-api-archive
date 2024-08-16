import { MigrationInterface, QueryRunner } from '@awesome-dev/server-typeorm';

export class AddCourse1708503170190 implements MigrationInterface {
  name = 'AddCourse1708503170190';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`course\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`companyId\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`deployTime\` time NULL, \`status\` enum ('CREATING', 'DEPLOYING', 'STOP', 'FINISHED') NOT NULL DEFAULT 'CREATING', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`course\` ADD CONSTRAINT \`FK_b5dfd29338b3996c9d2a6a4b3e0\` FOREIGN KEY (\`companyId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_b5dfd29338b3996c9d2a6a4b3e0\``,
    );
    await queryRunner.query(`DROP TABLE \`course\``);
  }
}
