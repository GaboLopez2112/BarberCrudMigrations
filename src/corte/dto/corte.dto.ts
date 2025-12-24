import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CorteDto {
  @IsNotEmpty({ message: 'campo no vacio' })
  @IsString()
  readonly nombreCorte: string;
  @IsString()
  readonly detalleCorte: string;
}
export class UpdateCorteDto {
  @IsOptional()
  @IsString()
  readonly nombreCorte: string;
  @IsOptional()
  @IsString()
  readonly detalleCorte: string;
}
