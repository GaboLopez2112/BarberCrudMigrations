import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CitaSchema } from './cita.schema';

@Entity('corte')
export class CorteSchema {
  @PrimaryGeneratedColumn('uuid', {name:'idCorte'})
  idCorte: string;
  @Column({name:'nombreCorte'})
  nombreCorte: string;
  @Column({name:'detalleCorte'})
  detalleCorte: string;
  @OneToMany(() => CitaSchema, (cita) => cita.corte)
  cita: CitaSchema[];
}
