import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { COMMENTMESSAGE } from 'src/constants/comment-message.constant';

export class GetCommentListDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: COMMENTMESSAGE.COMMON.CARDID.REQUIRED })
  cardId: number;
}
