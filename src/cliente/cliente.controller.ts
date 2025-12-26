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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cliente')
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @ApiOperation({summary:'Crear Cliente'})
  @ApiResponse({status:200, description: 'Cliente creado correctamente'})
  @Post('crear')
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.createCliente(createClienteDto);
  }

  @ApiOperation({summary:'Listar Cliente'})
  @Get('listar')
  findAllBarbero() {
    return this.clienteService.findAllCliente();
  }

  @ApiOperation({summary:'Listar Cliente por ID'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOneClienteById(id);
  }

  @ApiOperation({summary:'Actualizar Cliente por ID'})
  @ApiResponse({status:200, description: 'Cliente actualizado correctamente'})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.updateClinte(id, updateClienteDto);
  }

  @ApiOperation({summary:'Eliminar Cliente por ID'})
  @ApiResponse({status:200, description: 'Cliente eliminado correctamente'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.removeCliente(id);
  }
}
