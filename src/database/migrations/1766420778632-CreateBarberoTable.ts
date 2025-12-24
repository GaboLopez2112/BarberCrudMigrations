import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBarberoTable1766420778632 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS barbero(
          "idBarbero"  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          "dniBarbero"  varchar(255) NOT NULL,
          "nombreBarbero" varchar(255) NOT NULL
        );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE IF EXISTS barbero;`)
    }

}
