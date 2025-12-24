import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClienteTable1766497164134 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS cliente(
        "idCliente" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "dniCliente" varchar (225) NOT NULL,
        "nombreCliente" varchar(225) NOT NULL
      );
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
      DROP TABLE IF EXISTS cliente;
      `)
    }

}
