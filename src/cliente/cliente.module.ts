import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteSchema } from '../schemas/cliente.schema';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteSchema])],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
