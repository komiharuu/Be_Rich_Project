import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCardDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: '리스트 id를 입력해주세요.' })
  list_id: number;

  @IsString()
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '내용을 입력해주세요.' })
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: '위치를 입력해주세요.' })
  position: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: '할당자 id를 입력해주세요.' })
  assignment_id: number;

  @IsNotEmpty({ message: '마감일을 입력해주세요.' })
  duedate: Date;
}
