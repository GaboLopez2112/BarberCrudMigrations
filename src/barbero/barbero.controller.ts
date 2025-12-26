import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BarberoService } from './barbero.service';
import { CreateBarberoDto, UpdateBarberoDto } from './dto/barbero.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Barbero')
@Controller('barbero')
export class BarberoController {
  constructor(private readonly barberoService: BarberoService) {}

  @Post('create')
  @ApiOperation({ summary: 'Crear un barbero' })
  @ApiResponse({ status: 201, description: 'Barbero creado correctamente' })
  createBarbero(@Body() createBarberoDto: CreateBarberoDto) {
    return this.barberoService.createBarbero(createBarberoDto);
  }

  @Get('listar')
  @ApiOperation({ summary: 'Listar barberos' })
  findAll() {
    return this.barberoService.findAllBarber();
  }
  @ApiOperation({ summary: 'Listar por id' })
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.barberoService.findOneBarber(id);
  }

  @ApiOperation({ summary: 'Actualizar un barbero' })
  @ApiResponse({ status: 201, description: 'Barbero actualizado correctamente' })
  @Put(':id')
  updateBarber(@Param('id') id: string, @Body() updateBarberoDto: UpdateBarberoDto) {
    return this.barberoService.updateBarber(id, updateBarberoDto);
  }

  @ApiOperation({ summary: 'Eliminar un barbero' })
  @ApiResponse({ status: 201, description: 'Barbero eliminado correctamente' })
  @Delete(':id')
  removeBarber(@Param('id') id: string) {
    return this.barberoService.removeBarber(id);
  }
}
