import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { COMMENTMESSAGE } from 'src/constants/comment-message.constant';

export class CreateCommentDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: COMMENTMESSAGE.COMMON.CARDID.REQUIRED })
  cardId: number;

  @IsString()
  @IsNotEmpty({ message: COMMENTMESSAGE.COMMON.COMMENT.REQUIRED })
  comment: string;
}
