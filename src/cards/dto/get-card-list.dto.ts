import { IsNotEmpty, IsString } from 'class-validator';

export class GetCardListDto {
  title: string;

  description: string;
  list_id: number;

  // @Type(() => Number)
  // @IsNumber()
  // @IsNotEmpty({ message: '위치를 입력해주세요.' })
  // position: number;

  assignment_id: number;
  collaboratior_id: number;

  // @IsNotEmpty({ message: '마감일을 입력해주세요.' })
  // duedate: Date;
}
