import { Test, TestingModule } from '@nestjs/testing';
import { BarberoService } from '../barbero.service';
import { Repository } from 'typeorm';
import { BarberSchema } from '../../schemas/barber.schema';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

const mockBarberoRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('BarberoService', () => {
  let service: BarberoService;
  let repository: Repository<BarberSchema>;

  beforeEach(async () => {
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

  const barberoExistente ={
    idBarbero: 'uuid-existing',
    dniBarber: '1751459056#',
    nameBarber: 'Otro Barbero',
    cita: []
  };

  mockBarberoRepository.findOne.mockResolvedValue({
    idBarbero: 'uuid-existing',
  });

  await expect(service.createBarbero(dto)).rejects.toThrow(BadRequestException);
});

});
