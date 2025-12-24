import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/cliente.dto';
import { UpdateClienteDto } from './dto/cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteSchema } from '../schemas/cliente.schema';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteSchema)
    private clienteRepository: Repository<ClienteSchema>,
  ) {}
  async createCliente(createClienteDto: CreateClienteDto) {
    const existe = await this.clienteRepository.findOne({
      where:{dniCliente: createClienteDto.dniCliente}
    })
    if(existe)
    {
      throw new BadRequestException('El DNI ya está registrado');
    }
    const cliente = this.clienteRepository.create({
      dniCliente: createClienteDto.dniCliente,
      nombreCliente: createClienteDto.nombreCliente,
    });
    return await this.clienteRepository.save(cliente);
  }

  async findAllCliente() {
    return await this.clienteRepository.find();
  }

  async findOneClienteById(id: string) {
    const cliente = await this.clienteRepository.findOne({
      where: { idCliente: id },
    });
    if (!cliente) {
      throw new NotFoundException(
        `El id con numeor ${id}, no se encontro o no existe`,
      );
    }
    return cliente;
  }

  async updateClinte(id: string, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.findOne({
      where: { idCliente: id },
    });
    if (!cliente) {
      throw new NotFoundException(
        `Papi numero de id: ${id}, no encontrado en tu pobre sistema`,
      );
    }
    cliente.dniCliente = updateClienteDto.dniCliente || cliente.dniCliente;
    cliente.nombreCliente =
      updateClienteDto.nombreCliente || cliente.nombreCliente;

    const clienteActualizado = await this.clienteRepository.save(cliente);
    return {
      mensaje: `SU USUARIO CON NUMERO EXTENSO DE ID: ${id}, HA SIDO ACTUALIZADO`,
      clienteActualizado,
    };
  }

  async removeCliente(id: string) {
    const cliente = await this.clienteRepository.findOne({
      where: { idCliente: id },
    });
    if (!cliente) {
      throw new NotFoundException(
        `Papi numero de id: ${id}, no encontrado en tu pobre sistema`,
      );
    }
    await this.clienteRepository.remove(cliente)
    return{
      mensaje: `CLIENTE CON NUERMO DE DE ID ${id}, HA SIDO ELIMINADO `,
      cliente,
    }
  }
}
