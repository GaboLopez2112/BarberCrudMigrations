import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CitaDto {
  @IsNotEmpty({ message: 'ID de Barbero no encontrado' })
  readonly idBarber: string;
  @IsNotEmpty({ message: 'ID de Corte no encontrado' })
  readonly idCorte: string;
  @IsNotEmpty({ message: 'ID de Cliente no encontrado' })
  readonly idCliente: string;
  @IsNotEmpty()
  @IsDate()
  readonly fechaCita: string;
}
export class UpdateCitaDto {
  @IsOptional()
  @IsDate()
  readonly fechaCita: string;
  @IsOptional()
  readonly idBarber: string;
  @IsOptional()
  readonly idCorte: string;
  @IsOptional()
  readonly idCliente: string;
}
