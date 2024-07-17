import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Board } from '../entities/board.entity';

@Injectable()
export class BoardMemberGuard implements CanActivate {
  constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const boardIdString = request.params.boardId;

    if (!boardIdString) {
      // boardId가 없는 경우 (보드 목록 조회)
      const boards = await this.boardRepository.find({
        where: [{ ownerId: user.id }, { members: { userId: user.id } }],
        relations: ['user'],
      });

      if (boards.length === 0) {
        throw new NotFoundException('보유한 보드가 없습니다.');
      }
    } else {
      // boardId가 있는 경우
      const boardId: number = parseInt(boardIdString, 10);

      if (isNaN(boardId)) {
        throw new NotFoundException('유효하지 않은 보드 ID입니다.');
      }

      const board = await this.boardRepository.findOne({
        where: { id: boardId },
        relations: ['user', 'members'],
      });

      if (!board) {
        throw new NotFoundException('해당 보드를 찾을 수 없습니다.');
      }

      // 보드에 속해 있는지 여부를 확인
      const isMember = board.members.some((member) => member.userId === user.id);
      const isOwner = board.user.id === user.id;

      if (!isMember && !isOwner) {
        throw new NotFoundException('해당 보드에 대한 권한이 없습니다.');
      }
    }

    return true;
  }
}
