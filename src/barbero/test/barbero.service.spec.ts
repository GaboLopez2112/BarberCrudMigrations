import { Test, TestingModule } from '@nestjs/testing';
import { BarberoService } from '../barbero.service';
import { Repository } from 'typeorm';
import { BarberSchema } from '../../schemas/barber.schema';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockBarberoRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
};

describe('BarberoService', () => {
  let service: BarberoService;
  let repository: Repository<BarberSchema>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BarberoService,
        {
          provide: getRepositoryToken(BarberSchema),
          useValue: mockBarberoRepository,
        },
      ],
    }).compile();

    service = module.get<BarberoService>(BarberoService);
    repository = module.get<Repository<BarberSchema>>(
      getRepositoryToken(BarberSchema),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a barbero', async () => {
    const dto = {
      dniBarber: '1751459056#',
      nameBarber: 'Alejandro',
    };

    const barberMock = {
      idBarbero: 'uuid-test',
      dniBarber: dto.dniBarber,
      nameBarber: dto.nameBarber,
      cita: [],
    };
    mockBarberoRepository.findOne.mockResolvedValue(null);
    mockBarberoRepository.create.mockReturnValue(barberMock);
    mockBarberoRepository.save.mockReturnValue(barberMock);

    const result = await service.createBarbero(dto);

    expect(repository.create).toHaveBeenCalledWith({
      dniBarber: dto.dniBarber,
      nameBarber: dto.nameBarber,
    });
    expect(repository.save).toHaveBeenCalledWith(barberMock);
    expect(result).toEqual(barberMock);
  });

  it('should throw error if dni already exists', async () => {
    const dto = {
      dniBarber: '1751459056#',
      nameBarber: 'Gabriel',
    };

    mockBarberoRepository.findOne.mockResolvedValue({
      idBarbero: 'uuid-existing',
    });

    await expect(service.createBarbero(dto)).rejects.toThrow(
      BadRequestException,
    );
  });
  it('should return all barberos', async () => {
    const barberoMock = [
      {
        idBarbero: 'uuid-1',
        dniBarbero: '1751459056',
        nameBarbero: 'Juan',
        cita: [],
      },
      {
        idBarbero: 'uuid-2',
        dniBarber: '456',
        nameBarber: 'Pedro',
        cita: [],
      },
    ];
    mockBarberoRepository.find.mockResolvedValue(barberoMock);
    const result = await service.findAllBarber();

    expect(mockBarberoRepository.find).toHaveBeenCalled();
    expect(result).toEqual(barberoMock);
  });
  it('should return one barberos', async () => {
    const id = 'uuid-1';

    const barberoMock = {
      idBarber: 'uuid-1',
      dniBarbero: '1751459056',
      nameBarbero: 'Juan',
      cita: [],
    };

    mockBarberoRepository.findOne.mockResolvedValue(barberoMock);
    const result = await service.findOneBarber(id);

    expect(mockBarberoRepository.findOne).toHaveBeenCalledWith({
      where: { idBarber: id },
    });
    expect(result).toEqual(barberoMock);
  });
  it('should throw NotFoundException if barbero does not exist', async () => {
    const id = 'uuid-inexistente';
    mockBarberoRepository.findOne.mockResolvedValue(null);

    await expect(service.findOneBarber(id)).rejects.toThrow(NotFoundException);

    expect(mockBarberoRepository.findOne).toHaveBeenCalledWith({
      where: { idBarber: id },
    });
  });
  it('should update barbero successfully', async () => {
    const id = 'uidd-1';
    const barberoExiste = {
      idBarber: id,
      dniBarber: '1751459056',
      nameBarber: 'Juan',
      cita: [],
    };
    const updateDto = {
      dniBarber: '1751459056#',
      nameBarber: 'Gabriel',
    };

    const barberoActualizado = {
      ...barberoExiste,
      nameBarber: 'Gabriel',
    };

    mockBarberoRepository.findOne.mockResolvedValue(barberoExiste);
    mockBarberoRepository.save.mockResolvedValue(barberoActualizado);

    const result = await service.updateBarber(id, updateDto);

    expect(mockBarberoRepository.findOne).toHaveBeenCalledWith({
      where: { idBarber: id },
    });

    expect(mockBarberoRepository.save).toHaveBeenCalledWith({
      ...barberoExiste,
      nameBarber: 'Gabriel',
    });

    expect(result).toEqual({
      mensaje: `Barbero con numero de id: ${id}, fue actualizado`,
      barberActualizada: barberoActualizado,
    });
  });
  it('should throw NotFoundException if barbero does not exists', async () => {
    const id = 'uidd-1';
    mockBarberoRepository.findOne.mockResolvedValue(null);

    await expect(
      service.updateBarber(id, {
        dniBarber: '1751459056#',
        nameBarber: 'Gabriel',
      }),
    ).rejects.toThrow(NotFoundException);

    expect(mockBarberoRepository.findOne).toHaveBeenCalledWith({
      where: { idBarber: id },
    });
    expect(mockBarberoRepository.save).not.toHaveBeenCalled();
  });
  it('should remove barbero by id', async () => {
    const id = 'uuid-1';
    const barberMock = {
      idBarber: id,
      dniBarber: '54975855',
      nameBarber: 'Gabriel',
      cita: [],
    };
    mockBarberoRepository.findOne.mockResolvedValue(barberMock);
    mockBarberoRepository.remove.mockResolvedValue(barberMock);
    const result = await service.removeBarber(id);

    expect(mockBarberoRepository.findOne).toHaveBeenCalledWith({
      where: { idBarber: id },
    });
    expect(mockBarberoRepository.remove).toHaveBeenCalledWith(barberMock);

    expect(result).toEqual({
      mensaje: `barber con numero de id ${id}, eliminado`,
      barber: barberMock,
    });
  });
  it('should throw new NotFoundException when id already exists ', async () => {
    const id = 'uuid-1';

    mockBarberoRepository.findOne.mockResolvedValue(null);

    await expect(service.removeBarber(id)).rejects.toThrow(NotFoundException);

    expect(mockBarberoRepository.remove).not.toHaveBeenCalled();
  });
});
