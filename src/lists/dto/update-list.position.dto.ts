import { IsOptional, IsInt } from 'class-validator';

export class UpdateListPositionDto {
  @IsOptional()
  @IsInt()
  prevElPosition?: number;

  @IsOptional()
  @IsInt()
  nextElPosition?: number;
}
