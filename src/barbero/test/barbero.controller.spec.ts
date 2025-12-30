import { Test, TestingModule } from '@nestjs/testing';
import { BarberoController } from '../barbero.controller';
import { BarberoService } from '../barbero.service';
import { BarberSchema } from '../../schemas/barber.schema';

const mockBarberoService = {
  createBarbero: jest.fn(),
  findAllBarber: jest.fn(),
  findOneBarber: jest.fn(),
  updateBarber: jest.fn(),
  removeBarber: jest.fn(),
};
const mockBarbero: BarberSchema = {
  idBarber: 'uuid-1',
  dniBarber: '1751459056',
  nameBarber: 'Gabriel',
  cita: [],
};

describe('BarberoController', () => {
  let controller: BarberoController;
  let service: BarberoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarberoController],
      providers: [
        {
          provide: BarberoService,
          useValue: mockBarberoService,
        },
      ],
    }).compile();

    controller = module.get<BarberoController>(BarberoController);
    service = module.get<BarberoService>(BarberoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a barbero', async () => {
    const dto = {
      dniBarber: '1751459056',
      nameBarber: 'Gabriel',
    };
    mockBarberoService.createBarbero.mockResolvedValue(mockBarbero);

    const result = await controller.createBarbero(dto);

    expect(service.createBarbero).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockBarbero);
  });
  it('should find All barbero', async () => {
    mockBarberoService.findAllBarber.mockReturnValue([mockBarbero]);

    const result = await controller.findAll();

    expect(service.findAllBarber).toHaveBeenCalled();
    expect(result).toEqual([mockBarbero]);
  });
  it('should find BY ID barbero ', async () => {
    const id = 'uuid-1';
    mockBarberoService.findOneBarber.mockResolvedValue(mockBarbero);
    const result = await controller.findOneById(id);

    expect(service.findOneBarber).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockBarbero);
  });
  it('should update Barbero', async () => {
    const id = 'uuid-1';
    const updateDto = { dniBarber: '1751459056', nameBarber: 'Gabriel' };

    const responseMock = {
      mensaje: `Barbero con numero de id: ${id}, fue actualizado`,
      barberActualizada: {
        ...mockBarbero,

        nameBarber: 'Gabriel',
      },
    };
    mockBarberoService.updateBarber.mockResolvedValue(responseMock);

    const result = await controller.updateBarber(id, updateDto);

    expect(service.updateBarber).toHaveBeenCalledWith(id, updateDto);
    expect(result).toEqual(responseMock);
  });
  it('should remove barbero by id', async () => {
    const id = 'uuid-1';

    const responseMock = {
      mensaje: `barber con numero de id ${id}, eliminado`,
      barber: mockBarbero,
    };

    mockBarberoService.removeBarber.mockResolvedValue(responseMock);

    const result = await controller.removeBarber(id);

    expect(service.removeBarber).toHaveBeenCalledWith(id);
    expect(result).toEqual(responseMock);
  });
});
