import { Module } from '@nestjs/common';
import { BarberoService } from './barbero.service';
import { BarberoController } from './barbero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarberSchema } from '../schemas/barber.schema';

@Module({
  imports:[TypeOrmModule.forFeature([BarberSchema])],
  controllers: [BarberoController],
  providers: [BarberoService],
})
export class BarberoModule {}
