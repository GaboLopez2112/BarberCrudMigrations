import { BadRequestException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreateBarberoDto } from './dto/barbero.dto';
import { UpdateBarberoDto } from './dto/barbero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BarberSchema } from '../schemas/barber.schema';
import { Repository } from 'typeorm';

@Injectable()
export class BarberoService {
  constructor(
    @InjectRepository(BarberSchema)
    private barberoRepository: Repository<BarberSchema>,
  ) {}
  async createBarbero(data: CreateBarberoDto) {
    const existe = await this.barberoRepository.findOne({
      where: { dniBarber: data.dniBarber },
    });
    if(existe){
      throw new BadRequestException(`EL DNI CON NUMERO ${data.dniBarber}, YA ESTA REGISTRADO`)
    }
    const barbero = await this.barberoRepository.create({
      dniBarber: data.dniBarber,
      nameBarber: data.nameBarber,
    });
    return this.barberoRepository.save(barbero);
  }

  async findAllBarber() {
    return await this.barberoRepository.find();
  }

  async findOneBarber(id: string) {
    const barber = await this.barberoRepository.findOne({
      where: { idBarber: id },
    });
    if (!barber) {
      throw new NotFoundException(` barbero con id ${id}, No encontrado`);
    }
    return barber;
  }

  async updateBarber(id: string, updateBarberoDto: UpdateBarberoDto) {
    const barber = await this.barberoRepository.findOne({
      where: { idBarber: id },
    });
    if (!barber) {
      throw new NotFoundException(`BARBERO CON ID ${id}, NO ENCONTRADO`);
    }
    barber.dniBarber = updateBarberoDto.dniBarber || barber.dniBarber;
    barber.nameBarber = updateBarberoDto.nameBarber || barber.nameBarber;

    const barberActualizada = await this.barberoRepository.save(barber);

    return {
      mensaje: `Barbero con numero de id: ${id}, fue actualizado`,
      barberActualizada,
    };
  }

  async removeBarber(id: string) {
    const barber = await this.barberoRepository.findOne({
      where: { idBarber: id },
    });
    if (!barber) {
      throw new NotFoundException(
        `BARBER CON NUEMRO DE ID: ${id}, NO ENCONTRADO O NO EXISTE`,
      );
    }
    await this.barberoRepository.remove(barber);
    return {
      mensaje: `barber con numero de id ${id}, eliminado`,
      barber,
    };
  }
}
