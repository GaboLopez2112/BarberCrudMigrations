import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCorteTable1766427568289 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS corte(
        "idCorte" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nombreCorte" varchar(225) NOT NULL,
        "detalleCorte" varchar(225) 
      );
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query( `
      DROP TABLE IF EXISTS  cortes;
      `)
    }

}
