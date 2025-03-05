/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  displayName?: string;
}
