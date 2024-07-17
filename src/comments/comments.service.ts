import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { COMMENTMESSAGE } from 'src/constants/comment-message.constant';
import { User } from 'src/users/entities/user.entity';
import { Card } from 'src/cards/entities/card.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Card)
    private cardRepository: Repository<Card>
  ) {}

  // 댓글 생성 api
  async createComment(createCommentDto: CreateCommentDto, user: User) {
    const { comment, cardId } = createCommentDto;
    const card = await this.cardRepository.findOne({ where: { id: cardId } });
    if (!cardId) {
      throw new Error(COMMENTMESSAGE.COMMON.NOTFOUND.CARD);
    }

    const newComment = await this.commentRepository.create({
      comment,
      user: { id: user.id },
      card: { id: cardId },
    });
    await this.commentRepository.save(newComment);
    return newComment;
  }

  // 댓글 수정 api
  async updateComment(commentId: number, updateCommentDto: UpdateCommentDto) {
    // 수정할 댓글 아이디를 찾습니다.
    const comment = await this.commentRepository.findOne({ where: { id: commentId } });

    if (!comment) {
      throw new NotFoundException(COMMENTMESSAGE.COMMON.NOTFOUND.COMMENT);
    }

    // 댓글을 수정합니다.
    this.commentRepository.update(commentId, updateCommentDto);

    await this.commentRepository.save(comment);

    return comment;
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
