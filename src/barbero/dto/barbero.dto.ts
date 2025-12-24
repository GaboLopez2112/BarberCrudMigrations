import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBarberoDto {
  @IsString()
  @IsNotEmpty({message:'Este campo no es vacio'})
  readonly dniBarber: string;

  @IsString()
  @IsNotEmpty({message:'Este campo no es vacio'})
  readonly nameBarber: string
}
export class UpdateBarberoDto {
  @IsString()
  @IsOptional()
  readonly dniBarber: string;

  @IsString()
  @IsOptional()
  readonly nameBarber: string
}

