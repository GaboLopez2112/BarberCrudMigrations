import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BarberSchema } from './barber.schema';
import { CorteSchema } from './corte.schema';
import { ClienteSchema } from './cliente.schema';

@Entity('cita')
export class CitaSchema {
  @PrimaryGeneratedColumn('uuid', {name:'idCita'})
  idCita: string;
  @ManyToOne(() => BarberSchema, (barbero) => barbero.cita)
  @JoinColumn({name:'idBarbero'})
  barbero: BarberSchema;

  @ManyToOne(()=> CorteSchema, (corte)=> corte.cita)
  @JoinColumn({name:'idCorte'})
  corte: CorteSchema;

  @ManyToOne(()=> ClienteSchema, (cliente)=> cliente.cita)
  @JoinColumn({name:'idCliente'})
  cliente: ClienteSchema;

  @Column({name:'fechaCita'})
  fechaCita: string

}
