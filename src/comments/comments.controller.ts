import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetCommentListDto } from './dto/get-comment-list.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // 댓글 생성
  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.createComment(createCommentDto);
  }

  // 댓글 전체 조회
  @Get()
  async getCommentList(@Body() getCommentListDto: GetCommentListDto) {
    return await this.commentsService.getCommentList(getCommentListDto);
  }

  // 댓글 수정
  @Patch(':commentId')
  async updateComment(
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    await this.commentsService.updateComment(commentId, updateCommentDto);
    return { statusCode: HttpStatus.CREATED, message: '댓글 수정에 성공했습니다.' };
  }

  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: number) {
    await this.commentsService.deleteComment(commentId);
    return { statusCode: HttpStatus.CREATED, message: '댓글 삭제에 성공했습니다.' };
  }
}
