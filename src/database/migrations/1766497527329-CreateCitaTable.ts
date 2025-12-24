import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCitaTable1766497527329 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS cita(
        "idCita" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "idCorte" UUID NOT NULL,
        "idCliente" UUID NOT NULL,
        "idBarbero" UUID NOT NULL,
        "fechaCita" TIMESTAMP NOT NULL,
        
        CONSTRAINT fk_cita_corte
        FOREIGN KEY ("idCorte") REFERENCES corte("idCorte") 
        ON DELETE CASCADE,
        
        CONSTRAINT fk_cita_cliente 
        FOREIGN KEY ("idCliente") REFERENCES cliente("idCliente")
        ON DELETE CASCADE,
        
        CONSTRAINT fk_cita_barbero 
        FOREIGN KEY ("idBarbero") REFERENCES barbero("idBarbero")
        ON DELETE CASCADE
      );
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
      DROP TABLE IF EXISTS cita;
      `)
    }

}
