import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { BarberoService } from './barbero.service';
import { CreateBarberoDto, UpdateBarberoDto } from './dto/barbero.dto';

@Controller('barbero')
export class BarberoController {
  constructor(private readonly barberoService: BarberoService) {}

  @Post('create')
  createBarbero(@Body() createBarberoDto: CreateBarberoDto) {
    return this.barberoService.createBarbero(createBarberoDto);
  }

  @Get('listar')
  findAll() {
    return this.barberoService.findAllBarber();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.barberoService.findOneBarber(id);
  }

  @Put(':id')
  updateBarber(@Param('id') id: string, @Body() updateBarberoDto: UpdateBarberoDto) {
    return this.barberoService.updateBarber(id, updateBarberoDto);
  }

  @Delete(':id')
  removeBarber(@Param('id') id: string) {
    return this.barberoService.removeBarber(id);
  }
}
