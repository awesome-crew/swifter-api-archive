import { MigrationInterface, QueryRunner } from '@awesome-dev/server-typeorm';

export class AddUser1708188080658 implements MigrationInterface {
  name = 'AddUser1708188080658';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`companyName\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`passwordSalt\` varchar(255) NULL, \`passwordEncrypted\` varchar(255) NULL, \`passwordCreatedat\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
