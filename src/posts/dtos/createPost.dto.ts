import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class createPostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
