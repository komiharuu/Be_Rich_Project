import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCommentListDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: '카드 id를 입력해주세요.' })
  cardId: number;
}
