import { IsNotEmpty, IsString } from 'class-validator';

export class MoveCardDto {
  prevElIndexNumber: number;

  nextElIndexNumber: number;
  position: number;

  // @IsNotEmpty({ message: '마감일을 입력해주세요.' })
  // duedate: Date;
}
