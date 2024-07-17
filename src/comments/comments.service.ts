import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { GetCommentListDto } from './dto/get-comment-list.dto';
import { COMMENTMESSAGE } from 'src/constants/comment-message.constant';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) {}

  // 댓글 생성 api
  async createComment(createCommentDto: CreateCommentDto, user: User) {
    const { comment, cardId } = createCommentDto;

    const newComment = await this.commentRepository.save({
      comment,
      user: { id: user.id },
      card: { id: cardId },
    });
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
