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
import { CorteService } from './corte.service';
import { CorteDto } from './dto/corte.dto';
import { UpdateCorteDto } from './dto/corte.dto';

@Controller('corte')
export class CorteController {
  constructor(private readonly corteService: CorteService) {}

  @Post('create')
  create(@Body() createCorteDto: CorteDto) {
    return this.corteService.createCorte(createCorteDto);
  }

  @Get('listar')
  findAll() {
    return this.corteService.findAllCorte();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.corteService.findOneCorte(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCorteDto: UpdateCorteDto) {
    return this.corteService.updateCorte(id, updateCorteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corteService.removeCorte(id);
  }
}
