import { MigrationInterface, QueryRunner } from '@awesome-dev/server-typeorm';

export class AddCompany1708263029061 implements MigrationInterface {
  name = 'AddCompany1708263029061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`companyName\` \`companyId\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`companyId\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`companyId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_86586021a26d1180b0968f98502\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_86586021a26d1180b0968f98502\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`companyId\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`companyId\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`company\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`companyId\` \`companyName\` varchar(255) NOT NULL`,
    );
  }
}
