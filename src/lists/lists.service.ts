import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { User } from 'src/users/entities/user.entity';
import { Board } from 'src/boards/entities/board.entity';
import { UpdateListPositionDto } from './dto/update-list.position.dto';

@Injectable()
export class ListService {

  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async createList(
    createListDto: CreateListDto,
    boardId: number,
    userId: number
  ): Promise<any> {
    const { title } = createListDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const board = await this.boardRepository.findOne({ where: { id: boardId } });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    if (!board) {
      throw new NotFoundException('보드를 찾을 수 없습니다.');
    }

    // 모든 리스트를 가져옵니다.
    const lists = await this.listRepository.find({ where: {boardId}, order: { position: 'ASC' } });

    let newPosition: number;
    if (lists.length === 0) {
      // 테이블에 행이 없는 경우
      newPosition = 1024;
    } else {
      // 테이블에 행이 하나 이상 있는 경우
      const maxPosition = lists[lists.length - 1].position;
      newPosition = maxPosition + 1024;
    }

    const newList = this.listRepository.create({
      title,
      user,
      board,
      position: newPosition,
    });

    await this.listRepository.save(newList);

    return {
      id: newList.id,
      title: newList.title,
      created_At: newList.created_At,
      updated_At: newList.updated_At,
    };
  }

  async updateList(id: number, updateListDto: UpdateListDto): Promise<List> {
    const list = await this.listRepository.preload({
      id, ...updateListDto,
    });

    if (!list) {
      throw new NotFoundException('리스트를 찾을 수 없습니다');
    }

    return this.listRepository.save(list);
  }

  async deleteList(id: number): Promise<{ message:string }> {
    const list = await this.listRepository.findOne({ where: { id } });

    if (!list) {
      throw new NotFoundException('리스트를 찾을 수 없습니다');
    }

    list.is_Deleted = true;
  
    await this.listRepository.save(list);

    return { message: '삭제가 완료 되었습니다.'}
  }

  async getLists(boardId: number): Promise<any[]> {
    const lists = await this.listRepository.find({
      where: { boardId },
      relations: ['board', 'cards'],
      order: { position: 'ASC' },
    });

    lists.forEach(list => {
      list.cards.sort((a, b) => a.position - b.position);
    });

    return lists.map(list => ({
      id: list.id,
      title: list.title,
      position:list.position,
      created_At: list.created_At,
      updated_At: list.updated_At,
      board: {
        id: list.board.id,
        title: list.board.title,
      },
      cards: list.cards.map(card => ({
        id: card.id,
        title: card.title,
        position: card.position,
      })),
    }));
  }


  async updatePosition(id: number, updateListPositionDto: UpdateListPositionDto): Promise<List> {
    const { prevElPosition, nextElPosition } = updateListPositionDto;

    let newPosition: number;
    if (prevElPosition === undefined) {
      newPosition = nextElPosition - 512;
       // 드래그된 요소가 가장 상단에 있는 경우
    } else if (nextElPosition === undefined) {
      newPosition = prevElPosition + 512;
      // 드래그된 요소가 가장 하단에 있는 경우
    } else {
      // 드래그된 요소가 중간에 위치한 경우
      newPosition = Math.floor((prevElPosition + nextElPosition) / 2);
    }

    const list = await this.listRepository.findOne({ where: { id } });

    if (!list) {
      throw new NotFoundException('리스트를 찾을 수 없습니다');
    }

    list.position = newPosition;
    await this.listRepository.save(list);
     
     // 포지션 겹침 방지
     if (
      (prevElPosition !== undefined && Math.abs(newPosition - prevElPosition) <= 1) ||
      (nextElPosition !== undefined && Math.abs(newPosition - nextElPosition) <= 1)
    ) {
     // 모든 리스트를 포지션 오름차순으로 조회
      const lists = await this.listRepository.find({
        order: { position: 'ASC' },
      });
     
     
     // 리스트의 포지션을 순서대로 재설정
      for (let i = 0; i < lists.length; i++) {
        lists[i].position = (i + 1) * 1024;
        await this.listRepository.save(lists[i]);
      }
    }

    return list;
  }
}

