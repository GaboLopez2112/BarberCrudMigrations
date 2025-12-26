import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CitaService } from './cita.service';
import { CitaDto } from './dto/cita.dto';
import { UpdateCitaDto } from './dto/cita.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cita')
@Controller('cita')
export class CitaController {
  constructor(private readonly citaService: CitaService) {}

  @ApiOperation({summary:'Crear una cita'})
  @ApiResponse({status:200,description:'Cita creada correctamente'})
  @Post('crear')
  create(@Body() createCitaDto: CitaDto) {
    return this.citaService.createCita(createCitaDto);
  }

  @ApiOperation({summary:'Listar citas'})
  @Get('listar')
  findAll() {
    return this.citaService.findAllCita();
  }

  @ApiOperation({summary:'Listar cita by ID'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citaService.findOneCita(id);
  }

  @ApiOperation({ summary: 'Actualizar una cita' })
  @ApiResponse({ status: 201, description: 'Cita actualizada correctamente' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCitaDto: UpdateCitaDto) {
    return this.citaService.updateCita(id, updateCitaDto);
  }

  @ApiOperation({ summary: 'Eliminar una cita' })
  @ApiResponse({ status: 201, description: 'Cita eliminada correctamente' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citaService.removeCita(id);
  }
}
