import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { User } from 'src/users/entities/user.entity';
import { Board } from 'src/boards/entities/board.entity';

@Injectable()
export class ListService {
  update(arg0: number, updateListDto: UpdateListDto) {
    throw new Error('Method not implemented.');
  }
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

 
  async create(createListDto: CreateListDto, userId: number): Promise<List> {
    const { title, position, is_deleted, boardId } = createListDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const board = await this.boardRepository.findOne({ where: { id: boardId } });

    if (!user) {
      throw new Error('User not found');
    }

    if (!board) {
      throw new Error('Board not found');
    }

    const list = this.listRepository.create({
      title,
      position,
      is_deleted: is_deleted || false,
      user,
      board,
    });

    return this.listRepository.save(list);
  }
}