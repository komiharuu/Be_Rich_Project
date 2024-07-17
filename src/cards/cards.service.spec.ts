import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { List } from 'src/lists/entities/list.entity';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        { provide: getRepositoryToken(Card), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: getRepositoryToken(List), useValue: {} },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
