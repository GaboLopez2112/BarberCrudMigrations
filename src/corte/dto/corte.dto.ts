import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CorteDto {
  @ApiProperty({
    example:'Militar',
    description: 'nombre del Corte'
  })
  @IsNotEmpty({ message: 'campo no vacio' })
  @IsString()
  readonly nombreCorte: string;

  @ApiProperty({
    example:'Corte con numero de cuchillla #0',
    description: 'se describe el corte'
  })
  @IsString()
  readonly detalleCorte: string;
}
export class UpdateCorteDto {
  @ApiProperty({
    example:'Clasico',
    description: 'nombre del Corte'
  })
  @IsOptional()
  @IsString()
  readonly nombreCorte: string;

  @ApiProperty({
    example:'Corte con numero de cuchillla #1',
    description: 'se describe el corte'
  })
  @IsOptional()
  @IsString()
  readonly detalleCorte: string;
}
