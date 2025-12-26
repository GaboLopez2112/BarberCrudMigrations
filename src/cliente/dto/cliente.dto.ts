import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({
    example:'17544358#',
    description:'ID del cliente'
  })
  @IsNotEmpty({message: 'campo no vacio'})
  @IsString()
  readonly dniCliente : string;

  @ApiProperty({
    example:'Julio Chugchilema',
    description:'nombre del cliente'
  })
  @IsNotEmpty({message: 'campo no vacio'})
  @IsString()
  readonly nombreCliente : string;
}
export class UpdateClienteDto{
  @ApiProperty({
    example:'17544344#',
    description:'ID del cliente'
  })
  @IsOptional()
  @IsString()
  readonly dniCliente : string;

  @ApiProperty({
    example:'Julia Chugchilema',
    description:'nombre del cliente'
  })
  @IsOptional()
  @IsString()
  readonly nombreCliente : string;
}

