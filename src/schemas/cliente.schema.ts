import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CitaSchema } from './cita.schema';

@Entity({ name: 'cliente' })
export class ClienteSchema {
  @PrimaryGeneratedColumn('uuid', { name: 'idCliente' })
  idCliente: string;
  @Column({ name: 'dniCliente' })
  dniCliente: string;
  @Column({ name: 'nombreCliente' })
  nombreCliente: string;
  @OneToMany(() => CitaSchema, (cita) => cita.cliente)
  cita: CitaSchema[];
}
