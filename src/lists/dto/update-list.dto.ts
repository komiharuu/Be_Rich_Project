import { IsNotEmpty, IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class UpdateListDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsInt()
  @IsOptional()
  position?: number;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;
}
