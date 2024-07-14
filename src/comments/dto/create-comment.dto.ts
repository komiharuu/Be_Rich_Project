import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCommentDto {
  //   @Type(() => Number)
  //   @IsNumber()
  //   @IsNotEmpty({ message: '카드 id를 입력해주세요.' })
  //   card_id: number;

  @IsString()
  @IsNotEmpty({ message: '내용을 입력해주세요.' })
  comment: string;
}
