import { IsOptional, IsString, MaxLength } from 'class-validator';

export class updatePostDto {
  @IsString()
  @IsOptional()
  @MaxLength(200)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
