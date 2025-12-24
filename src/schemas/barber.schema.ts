import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CitaSchema } from './cita.schema';

@Entity('barbero')
export class BarberSchema {
  @PrimaryGeneratedColumn('uuid', {name: 'idBarbero'})
  idBarber: string;
  @Column({name: 'dniBarbero'})
  dniBarber: string;
  @Column({name: 'nombreBarbero'})
  nameBarber: string;

  @OneToMany(() => CitaSchema, (cita) => cita.barbero)
  cita: CitaSchema[];
}
