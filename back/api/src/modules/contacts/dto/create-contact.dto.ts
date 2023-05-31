import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;
  
  @IsNumber()
  @IsNotEmpty()
  telefone: number;
}
