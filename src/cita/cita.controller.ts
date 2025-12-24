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

@Controller('cita')
export class CitaController {
  constructor(private readonly citaService: CitaService) {}

  @Post('crear')
  create(@Body() createCitaDto: CitaDto) {
    return this.citaService.createCita(createCitaDto);
  }

  @Get('listar')
  findAll() {
    return this.citaService.findAllCita();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citaService.findOneCita(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCitaDto: UpdateCitaDto) {
    return this.citaService.updateCita(id, updateCitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citaService.removeCita(id);
  }
}
