import { IsNotEmpty, IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateListDto {
  @IsString()
  @IsNotEmpty({ message: '리스트 제목을 입력해주세요.' })
  title: string;

  @IsInt()
  @IsNotEmpty({ message: '보드 ID를 입력해주세요.' })
  boardId: number;
}
