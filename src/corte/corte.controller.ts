import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CorteService } from './corte.service';
import { CorteDto } from './dto/corte.dto';
import { UpdateCorteDto } from './dto/corte.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Corte')
@Controller('corte')
export class CorteController {
  constructor(private readonly corteService: CorteService) {}

  @ApiOperation({summary:'Crear Corte'})
  @ApiResponse({status: 200, description: 'Corte creado correctamente'})
  @Post('create')
  create(@Body() createCorteDto: CorteDto) {
    return this.corteService.createCorte(createCorteDto);
  }

  @ApiOperation({summary:'Listar Corte'})
  @Get('listar')
  findAll() {
    return this.corteService.findAllCorte();
  }

  @ApiOperation({summary:'Listar Corte por ID'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.corteService.findOneCorte(id);
  }

  @ApiOperation({summary:'Actualizar Corte'})
  @ApiResponse({status: 200, description: 'Corte actualizado correctamente'})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCorteDto: UpdateCorteDto) {
    return this.corteService.updateCorte(id, updateCorteDto);
  }

  @ApiOperation({summary:'Eliminar Corte'})
  @ApiResponse({status: 200, description: 'Corte eliminado correctamente'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corteService.removeCorte(id);
  }
}
