import { Module } from '@nestjs/common';
import { CorteService } from './corte.service';
import { CorteController } from './corte.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorteSchema } from '../schemas/corte.schema';

@Module({
  imports: [TypeOrmModule.forFeature([CorteSchema])],
  controllers: [CorteController],
  providers: [CorteService],
})
export class CorteModule {}
