import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BarberSchema } from './barber.schema';

@Entity()
export class CitaSchema {
  @ManyToOne(() => BarberSchema, (barbero) => barbero.cita)
  @JoinColumn()
  barbero: BarberSchema;
}
