import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBarberoDto {
  @ApiProperty({
    example: '1751459056#',
    description: 'DNI del barbero',
  })
  @IsString()
  @IsNotEmpty({message:'Este campo no es vacio'})
  readonly dniBarber: string;

  @ApiProperty({
    example: 'Gabriel',
    description: 'Nombre del barbero',
  })
  @IsString()
  @IsNotEmpty({message:'Este campo no es vacio'})
  readonly nameBarber: string
}
export class UpdateBarberoDto {
  @ApiProperty({
    example: '1751459088#',
    description: 'DNI del barbero',
  })
  @IsString()
  @IsOptional()
  readonly dniBarber: string;

  @ApiProperty({
    example: 'Gabriela',
    description: 'Nombre del barbero',
  })
  @IsString()
  @IsOptional()
  readonly nameBarber: string
}

