import { Module } from '@nestjs/common';
import { CitaService } from './cita.service';
import { CitaController } from './cita.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaSchema } from '../schemas/cita.schema';
import { BarberSchema } from '../schemas/barber.schema';
import { ClienteSchema } from '../schemas/cliente.schema';
import { CorteSchema } from '../schemas/corte.schema';

@Module({
  imports:[TypeOrmModule.forFeature([CitaSchema,BarberSchema,ClienteSchema,CorteSchema])],
  controllers: [CitaController],
  providers: [CitaService],
})
export class CitaModule {}
