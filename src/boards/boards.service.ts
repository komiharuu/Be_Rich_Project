import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  /**
   * 보드 생성
   *  */
  async createBoard(createBoardDto: CreateBoardDto, userId: number) {
    const { title, description, backgroundColor } = createBoardDto;

    //제목을 기준으로 있는 보드인지 확인
    const existingTitle = await this.boardRepository.findOne({
      where: { title },
    });

    if (existingTitle) {
      throw new ConflictException('이미 등록된 보드 입니다.');
    }

    //사용자 정보 가져오기
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 보드 생성
    const newBoard = this.boardRepository.create({
      title,
      description,
      backgroundColor,
      user,
    });

    //데이터 저장
    await this.boardRepository.save(newBoard);

    //반환 데이터
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

  async getBoardList() {
    //캐싱 된 데이터 찾기
    const cachedBords = await this.cacheManager.get<Board[]>('boards');
    //캐싱 된 데이터가 있다면, 데이터 가져오기
    if (cachedBords) {
      const cachedBordList = cachedBords.map((board) => ({
        boardId: board.id,
        ownerId: board.user.id,
        title: board.title,
        createdAt: board.createdAt,
        updatedAt: board.updatedAt,
      }));

      return {
        status: HttpStatus.OK,
        data: cachedBordList,
      };
    }

    //데이터베이스에서 데이터 찾기
    const boards = await this.boardRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
    await this.cacheManager.set('boards', boards);

    const boardList = boards.map((board) => ({
      boardId: board.id,
      ownerId: board.user.id,
      title: board.title,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    }));

    return {
      status: HttpStatus.OK,
      data: boardList,
    };
  }

  getBoardDetail(id: number) {
    return `This action returns a #${id} board`;
  }

  updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  deleteBoard(id: number) {
    return `This action removes a #${id} board`;
  }
}
