import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { COMMENTMESSAGE } from 'src/constants/comment-message.constant';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { BoardMemberGuard } from 'src/boards/guards/board-member.guard';

@UseGuards(AuthGuard('jwt'), BoardMemberGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // 댓글 생성
  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto, @Req() req: any) {
    const user: User = req.user;
    return await this.commentsService.createComment(createCommentDto, user);
  }

  // 댓글 수정
  @Patch(':commentId')
  async updateComment(
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    await this.commentsService.updateComment(commentId, updateCommentDto);
    return { status: HttpStatus.CREATED, message: COMMENTMESSAGE.SUCCESS.UPDATE };
  }

  // 댓글 삭제
  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: number) {
    await this.commentsService.deleteComment(commentId);
    return { status: HttpStatus.CREATED, message: COMMENTMESSAGE.SUCCESS.DELETE };
  }
}
