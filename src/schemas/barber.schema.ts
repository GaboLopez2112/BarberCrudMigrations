import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CitaSchema } from './cita.schema';

@Entity()
export class BarberSchema {
  @PrimaryGeneratedColumn({ name: 'idBarber' })
  idBarber: string;
  @Column()
  dniBarber: string;
  @Column()
  nameBarber: string;

  @OneToMany(() => CitaSchema, (cita) => cita.barbero)
  cita: CitaSchema[];
}
