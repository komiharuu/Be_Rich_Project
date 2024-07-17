import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateListDto {
  @IsString()
  @IsNotEmpty({ message: '리스트 제목을 입력해주세요.' })
  title: string;

}
