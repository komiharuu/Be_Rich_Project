import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entities/board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BoardOwnerGuard implements CanActivate {
  constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const boardId: number = parseInt(request.params.boardId, 10);

    const board = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['user'],
    });

    if (!board) {
      throw new NotFoundException('해당 보드를 찾을 수 없습니다.');
    }
    // 보드에 속해 있는지 여부를 확인
    const isOwner = board.user.id === user.id;

    if (!isOwner) {
      throw new NotFoundException('해당 보드에 대한 권한이 없습니다.');
    }

    return true;
  }
}
