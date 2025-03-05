import { IsBoolean, IsOptional } from 'class-validator';

export class updateUserSettingDto {
  @IsBoolean()
  @IsOptional()
  notificationsOn?: boolean;

  @IsBoolean()
  @IsOptional()
  smsEnable?: boolean;
}
