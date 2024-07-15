import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { COMMENTMESSAGE } from 'src/constants/comment-message.constant';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsString()
  @IsNotEmpty({ message: COMMENTMESSAGE.COMMON.COMMENT.UPDATED })
  comment: string;
}
