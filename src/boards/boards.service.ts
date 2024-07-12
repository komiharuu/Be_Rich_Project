import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) {}

  /**
   * 보드 생성
   *  */
  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, description, backgroundColor } = createBoardDto;

    //제목을 기준으로 있는 보드인지 확인
    const existingTitle = await this.boardRepository.findOne({
      where: { title },
    });

    if (existingTitle) {
      throw new ConflictException('이미 등록된 보드 입니다.');
    }

    // 사용자 정보 가져오는 로직 필요

    // 보드 생성
    const newBoard = await this.boardRepository.save({
      title,
      description,
      backgroundColor,
    });

    return {
      status: HttpStatus.CREATED,
      message: '보드 생성이 완료되었습니다.',
      data: {
        id: newBoard.id,
        ownerId: newBoard.user.id,
        title: newBoard.title,
        createdAt: newBoard.createdAt,
        updatedAt: newBoard.updatedAt,
      },
    };
  }

  getAll() {
    return `This action returns all boards`;
  }

  getOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  delete(id: number) {
    return `This action removes a #${id} board`;
  }
}
