import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBoardDto {
  /**
   * 제목
   * @example "Test"
   */
  @IsString()
  @IsNotEmpty({ message: '보드 제목을 입력해주세요.' })
  title: string;

  /**
   * 설명
   * @example "Test ... "
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * 배경 색상
   * @example "#ffffff"
   */
  @IsOptional()
  @IsString()
  backgroundColor?: string;
}
