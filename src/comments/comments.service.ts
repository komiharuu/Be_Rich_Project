import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { GetCommentListDto } from './dto/get-comment-list.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  // 댓글 생성 api
  async createComment(createCommentDto: CreateCommentDto) {
    const newComment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(newComment);
  }

  // 댓글 전체조회 api
  async getCommentList(getCommentListDto: GetCommentListDto) {
    const { cardId: card_id } = getCommentListDto;
    const comments = await this.commentRepository.find({ where: { card_id } });
    if (!comments) {
      throw new NotFoundException(`해당 카드의 댓글을 찾을 수 없습니다.`);
    }
    return comments;
  }

  // 댓글 수정 api
  async updateComment(commentId: number, updateCommentDto: UpdateCommentDto) {
    // 수정할 댓글 아이디를 찾습니다.
    const comment = await this.commentRepository.findOne({ where: { id: commentId } });

    if (!comment) {
      throw new NotFoundException(`댓글을 찾을 수 없습니다.`);
    }

    // 댓글을 수정합니다.
    await this.commentRepository.update(commentId, updateCommentDto);

    return this.commentRepository.findOne({ where: { id: commentId } });
  }

  // 댓글 삭제 api
  async deleteComment(commentId: number) {
    const comment = await this.commentRepository.findOne({ where: { id: commentId } });

    if (!comment) {
      throw new NotFoundException(`댓글을 찾을 수 없습니다.`);
    }

    // 댓글을 삭제합니다
    await this.commentRepository.delete(commentId);
  }
}
