import { MigrationInterface, QueryRunner } from '@awesome-dev/server-typeorm';

export class AddCompanyMember1708265349467 implements MigrationInterface {
  name = 'AddCompanyMember1708265349467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`company_member\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`companyId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`team\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_member\` ADD CONSTRAINT \`FK_24e3f0ad735ec89bb235a395547\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`company_member\` DROP FOREIGN KEY \`FK_24e3f0ad735ec89bb235a395547\``,
    );
    await queryRunner.query(`DROP TABLE \`company_member\``);
  }
}
