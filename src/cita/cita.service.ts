import { BadRequestException, Injectable } from '@nestjs/common';
import { CitaDto } from './dto/cita.dto';
import { UpdateCitaDto } from './dto/cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CitaSchema } from '../schemas/cita.schema';
import { Repository } from 'typeorm';
import { BarberSchema } from '../schemas/barber.schema';
import { CorteSchema } from '../schemas/corte.schema';
import { ClienteSchema } from '../schemas/cliente.schema';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(CitaSchema)
    private citaRepository: Repository<CitaSchema>,
    @InjectRepository(BarberSchema)
    private barberRepository: Repository<BarberSchema>,
    @InjectRepository(CorteSchema)
    private corteRepository: Repository<CorteSchema>,
    @InjectRepository(ClienteSchema)
    private clienteRepository: Repository<ClienteSchema>,
  ) {}
  async createCita(createCitaDto: CitaDto) {
    const exiteBarbero = await this.barberRepository.findOne({
      where: {
        idBarber: createCitaDto.idBarber,
      },
    });
    if (!exiteBarbero) {
      throw new BadRequestException(
        `No existe el barbero ${createCitaDto.idBarber}`,
      );
    }
    const existeCorte = await this.corteRepository.findOne({
      where: {
        idCorte: createCitaDto.idCorte,
      },
    });
    if (!existeCorte) {
      throw new BadRequestException(
        `No existe el CORTE ${createCitaDto.idCorte}`,
      );
    }
    const existeCliente = await this.clienteRepository.findOne({
      where: {
        idCliente: createCitaDto.idCliente,
      },
    });
    if (!existeCliente) {
      throw new BadRequestException(
        `No existe el cliente ${createCitaDto.idCliente}`,
      );
    }
    const cita = this.citaRepository.create({
      fechaCita: createCitaDto.fechaCita,
      corte: existeCorte,
      barbero: exiteBarbero,
      cliente: existeCliente,
    });
    return await this.citaRepository.save(cita);
  }
  async findAllCita() {
    const cita = await this.citaRepository.find(
      {
        relations:['corte','barbero','cliente'],
      }
    );
    return cita;
  }

  async findOneCita(id: string) {
    const existe = await this.citaRepository.findOne({
      where:{
        idCita:id,
      },
      relations:['cliente','corte','barbero'],
    });
    if(!existe){
      throw new BadRequestException(`Cita con numero de cita ${id}, no existe`)
    }
    return existe;

  }

  async updateCita(id: string, updateCitaDto: UpdateCitaDto) {
    const cita = await this.citaRepository.findOne({
      where:{
        idCita:id,
      },
      relations: ['cliente','barbero','corte'],
    });
    if(!cita){
      throw new BadRequestException(`numero de cita ${id} no enocotrad o no existe`);
    }
    cita.fechaCita = updateCitaDto.fechaCita || cita.fechaCita;

    const exiteBarbero = await this.barberRepository.findOne({
      where: {
        idBarber: updateCitaDto.idBarber,
      },
    });
    if (!exiteBarbero) {
      throw new BadRequestException(
        `No existe el barbero ${updateCitaDto.idBarber}`,
      );
    }
    const existeCorte = await this.corteRepository.findOne({
      where: {
        idCorte: updateCitaDto.idCorte,
      },
    });
    if (!existeCorte) {
      throw new BadRequestException(
        `No existe el CORTE ${updateCitaDto.idCorte}`,
      );
    }
    const existeCliente = await this.clienteRepository.findOne({
      where: {
        idCliente: updateCitaDto.idCliente,
      },
    });
    if (!existeCliente) {
      throw new BadRequestException(
        `No existe el cliente ${updateCitaDto.idCliente}`,
      );
    }

    const citactualizada = await this.citaRepository.save(cita)
    return{
      mensaje: 'cita actualizada',
      citactualizada,
    }
  }

  async removeCita(id: string) {
    const cita = await this.citaRepository.findOne({
      where:{
        idCita:id,
      },
      relations:['corte','barbero','cliente'],
    });
    if (!cita){
      throw new BadRequestException('no encontrado el id')
    }
    await this.citaRepository.remove(cita)
    return{
      mensaje:'cita eliminada',
      cita,
    }
  }
}
