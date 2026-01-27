import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(550)
  userName: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(550)
  password: string;
}

