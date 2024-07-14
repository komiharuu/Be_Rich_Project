import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { User } from 'src/users/entities/user.entity';
import { Board } from 'src/boards/entities/board.entity';

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

  async create(createListDto: CreateListDto, userId: number): Promise<List> {
    const { title, position,boardId } = createListDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const board = await this.boardRepository.findOne({ where: { id: boardId } });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    if (!board) {
      throw new NotFoundException('보드를 찾을 수 없습니다.');
    }

    const list = this.listRepository.create({
      title,
      position,
      user,
      board,
    });

    return this.listRepository.save(list);
  }

  async update(id: number, updateListDto: UpdateListDto): Promise<List> {
    const list = await this.listRepository.preload({
      id,
      ...updateListDto,
    });

    if (!list) {
      throw new NotFoundException('리스트를 찾을 수 없습니다');
    }

    return this.listRepository.save(list);
  }

  async delete(id: number): Promise<void> {
    const list = await this.listRepository.findOne({ where: { id } });

    if (!list) {
      throw new NotFoundException('리스트를 찾을 수 없습니다');
    }

    await this.listRepository.remove(list);
  }


  async findAll(): Promise<List[]> {
    return this.listRepository.find({ relations: ['user', 'board', 'cards'] });
  }
}
