import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  /**
   * 제목
   * @example "update Test"
   */
  @IsOptional()
  @IsString()
  title?: string;

  /**
   * 설명
   * @example "update Test ... "
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * 배경 색상
   * @example "#0fffff"
   */
  @IsOptional()
  @IsString()
  backgroundColor?: string;
}
