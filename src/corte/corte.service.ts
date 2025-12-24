import { BadRequestException, Injectable } from '@nestjs/common';
import { CorteDto } from './dto/corte.dto';
import { UpdateCorteDto } from './dto/corte.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CorteSchema } from '../schemas/corte.schema';
import { Repository } from 'typeorm';

@Injectable()
export class CorteService {
  constructor(
    @InjectRepository(CorteSchema)
    private corteRepository: Repository<CorteSchema>,
  ) {}
  async createCorte(createCorteDto: CorteDto) {
    const existe = await this.corteRepository.findOne({
      where: { nombreCorte: createCorteDto.nombreCorte },
    });
    if (existe) {
      throw new BadRequestException(
        `CORTE CON EL NOMBRE ${createCorteDto.nombreCorte} ESTA REGITRADO, PORFAVOR REGISTRELO CON OTRO NOMBRE`,
      );
    }
    const corte = this.corteRepository.create({
      nombreCorte: createCorteDto.nombreCorte,
      detalleCorte: createCorteDto.detalleCorte,
    });
    return await this.corteRepository.save(corte);
  }

  async findAllCorte() {
    return await this.corteRepository.find();
  }

  async findOneCorte(id: string) {
    const corte = await this.corteRepository.findOne({
      where: { idCorte: id },
    });
    if (!corte) {
      throw new BadRequestException(`id numero ${id}, no existe`);
    }
    return corte;
  }

  async updateCorte(id: string, updateCorteDto: UpdateCorteDto) {
    const existe = await this.corteRepository.findOne({
      where: { idCorte: id },
    });
    if (!existe) {
      throw new BadRequestException(`id numero ${id}, no existe`);
    }
    existe.nombreCorte = updateCorteDto.nombreCorte || existe.nombreCorte;
    existe.detalleCorte = updateCorteDto.detalleCorte || existe.detalleCorte;
    const corteActualizado = await this.corteRepository.save(existe);
    return {
      mensaje: `corte con nuemro de id : ${id}, ha sido actualizado:`,
      corteActualizado,
    };
  }

  async removeCorte(id: string) {
    const corte = await this.corteRepository.findOne({
      where: { idCorte: id },
    });
    if (!corte) {
      throw new BadRequestException(`id numero ${id}, no existe`);
    }
    await this.corteRepository.remove(corte);
    return{
      mensaje:`corte con id ${id}, ha sido eliminado`,
      corte,
    }
  }
}
