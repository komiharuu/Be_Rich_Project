import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { GetCommentListDto } from './dto/get-comment-list.dto';
import { COMMENTMESSAGE } from 'src/constants/comment-message.constant';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) {}

  // 댓글 생성 api
  async createComment(createCommentDto: CreateCommentDto) {
    const { comment, cardId: card_id } = createCommentDto;
    const newComment = this.commentRepository.save({ comment, card_id });
    return newComment;
  }

  // 댓글 전체조회 api
  async getCommentList(getCommentListDto: GetCommentListDto) {
    const { cardId: card_id } = getCommentListDto;
    const comments = await this.commentRepository.find({ where: { card_id } });
    if (!comments) {
      throw new NotFoundException(COMMENTMESSAGE.COMMON.NOTFOUND.CARD_COMMENT);
    }
    return comments;
  }

  // 댓글 수정 api
  async updateComment(commentId: number, updateCommentDto: UpdateCommentDto) {
    // 수정할 댓글 아이디를 찾습니다.
    const comment = await this.commentRepository.findOne({ where: { id: commentId } });

    if (!comment) {
      throw new NotFoundException(COMMENTMESSAGE.COMMON.NOTFOUND.COMMENT);
    }

    // 댓글을 수정합니다.
    const updateComment = await this.commentRepository.update(commentId, updateCommentDto);

    return updateComment;
  }

  // 댓글 삭제 api
  async deleteComment(commentId: number) {
    const comment = await this.commentRepository.findOne({ where: { id: commentId } });

    if (!comment) {
      throw new NotFoundException(COMMENTMESSAGE.COMMON.NOTFOUND.COMMENT);
    }

    // 댓글을 삭제합니다
    await this.commentRepository.delete(commentId);
  }
}
