import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/cliente.dto';
import { UpdateClienteDto } from './dto/cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('crear')
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.createCliente(createClienteDto);
  }

  @Get('listar')
  findAllBarbero() {
    return this.clienteService.findAllCliente();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOneClienteById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.updateClinte(id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.removeCliente(id);
  }
}
