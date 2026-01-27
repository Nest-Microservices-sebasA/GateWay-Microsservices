import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(550)
  messagePost: string;

 
}
