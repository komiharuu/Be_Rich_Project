import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from './lists.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { User } from 'src/users/entities/user.entity';
import { Board } from 'src/boards/entities/board.entity';

describe('ListsService', () => {
  let service: ListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListService,
        { provide: getRepositoryToken(List), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: getRepositoryToken(Board), useValue: {} },
      ],
    }).compile();

    service = module.get<ListService>(ListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
