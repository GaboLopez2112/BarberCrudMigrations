import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CitaDto {
  @ApiProperty({
    example: 'uuid-barbero',
    description: 'ID del barbero',
  })
  @IsNotEmpty({ message: 'ID de Barbero no encontrado' })
  readonly idBarber: string;

  @ApiProperty({
    example: 'uuid-corte',
    description: 'ID del corte',
  })
  @IsNotEmpty({ message: 'ID de Corte no encontrado' })
  readonly idCorte: string;

  @ApiProperty({
    example: 'uuid-cliente',
    description: 'ID del cliente',
  })
  @IsNotEmpty({ message: 'ID de Cliente no encontrado' })
  readonly idCliente: string;

  @ApiProperty({
    example: '2025-12-23T15:30:00',
    description: 'Fecha de la cita',
  })
  @IsNotEmpty()
  @IsDate()
  readonly fechaCita: string;
}

export class UpdateCitaDto {
  @ApiProperty({
    example: '2025-12-29T12:30:00',
    description: 'Fecha de la cita',
  })
  @IsOptional()
  @IsDate()
  readonly fechaCita: string;

  @ApiProperty({
    example: 'uuid-barbero',
    description: 'ID del barbero',
  })
  @IsNotEmpty({ message: 'ID de Barbero no encontrado' })
  readonly idBarber: string;

  @ApiProperty({
    example: 'uuid-corte',
    description: 'ID del corte',
  })
  @IsNotEmpty({ message: 'ID de Corte no encontrado' })
  readonly idCorte: string;

  @ApiProperty({
    example: 'uuid-cliente',
    description: 'ID del cliente',
  })
  @IsNotEmpty({ message: 'ID de Cliente no encontrado' })
  readonly idCliente: string;

}
