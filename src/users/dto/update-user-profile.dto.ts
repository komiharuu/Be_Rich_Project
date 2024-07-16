import { Optional } from '@nestjs/common';
import { IsString, ValidateIf } from 'class-validator';

export class UpdateUserProfileDto {
  @Optional()
  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  nickname: string;

  @Optional()
  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  profileImg: string;
}
