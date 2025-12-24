import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateClienteDto {
  @IsNotEmpty({message: 'campo no vacio'})
  @IsString()
  readonly dniCliente : string;
  @IsNotEmpty({message: 'campo no vacio'})
  @IsString()
  readonly nombreCliente : string;
}
export class UpdateClienteDto{
  @IsOptional()
  @IsString()
  readonly dniCliente : string;
  @IsOptional()
  @IsString()
  readonly nombreCliente : string;
}

