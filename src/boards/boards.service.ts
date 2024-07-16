import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UsersService } from 'src/users/users.service';
import { Board } from './entities/board.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  /* 보드 생성 */
  async createBoard(createBoardDto: CreateBoardDto, userId: number) {
    const { title, description, backgroundColor } = createBoardDto;

    // 사용자 정보 가져오기 (UsersService 이용)
    const user = await this.usersService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    //새로운 보드 생성
    const newBoard = this.boardRepository.create({
      title,
      description,
      backgroundColor,
      user,
    });

    //생성한 보드 데이터베이스에 저장
    await this.boardRepository.save(newBoard);

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

  /* 보드 목록 조회 */
  async getBoardList(user: User) {
    // 캐싱된 데이터 찾기
    const cachedBoards = await this.cacheManager.get<Board[]>('boards');
    // 캐싱된 데이터가 있다면, 데이터 반환
    if (cachedBoards) {
      const cachedBoardList = cachedBoards.map((board) => ({
        id: board.id,
        ownerId: board.user.id,
        title: board.title,
        createdAt: board.createdAt,
        updatedAt: board.updatedAt,
      }));

      return {
        status: HttpStatus.OK,
        data: cachedBoardList,
      };
    }

    // 데이터베이스에서 데이터 찾기
    const boards = await this.boardRepository.find({
      where: { user },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    // 조회된 데이터 캐시에 저장
    await this.cacheManager.set('boards', boards);

    const boardList = boards.map((board) => ({
      id: board.id,
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

  /* 보드 상세 조회 */
  async getBoardDetail(id: number, user: User) {
    // 보드 존재 여부 확인
    const board = await this.boardRepository.findOne({ where: { id, user } });

    if (!board) {
      throw new NotFoundException('존재하지 않는 보드입니다.');
    }

    return {
      status: HttpStatus.OK,
      data: {
        id: board.id,
        ownerId: board.user.id,
        title: board.title,
        description: board.description,
        backgroundColor: board.backgroundColor,
        isDeleted: board.isDeleted,
        createdAt: board.createdAt,
        updatedAt: board.updatedAt,
      },
    };
  }

  /* 보드 수정 */
  async updateBoard(id: number, updateBoardDto: UpdateBoardDto, user: User) {
    const { title, description, backgroundColor } = updateBoardDto;

    // 보드 존재 여부 확인
    const board = await this.boardRepository.findOne({ where: { id, user } });

    if (!board) {
      throw new NotFoundException('존재하지 않는 보드입니다.');
    }

    // 보드 업데이트
    if (title) {
      board.title = title;
    }
    if (description) {
      board.description = description;
    }
    if (backgroundColor) {
      board.backgroundColor = backgroundColor;
    }

    // 변경 사항 저장
    await this.boardRepository.save(board);

    return {
      status: HttpStatus.OK,
      message: '보드 수정에 성공했습니다.',
    };
  }

  /* 보드 삭제 */
  async deleteBoard(id: number, user: User) {
    // 보드 존재 여부 확인
    const board = await this.boardRepository.findOne({ where: { id, user } });

    if (!board) {
      throw new NotFoundException('존재하지 않는 보드입니다.');
    }

    // isDeleted 값 업데이트
    board.isDeleted = true;

    // 보드 삭제
    await this.boardRepository.delete(board);

    return {
      status: HttpStatus.OK,
      message: '보드 삭제에 성공했습니다.',
    };
  }
}
