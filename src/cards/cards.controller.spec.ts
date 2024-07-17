import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { title } from 'process';
import { UpdateCardDto } from './dto/update-card.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Board } from 'src/boards/entities/board.entity';

// ListsService Mocking
const mockCardsService = {
  createCard: jest.fn(),
  getCardDetail: jest.fn(),
  updateCard: jest.fn(),
  deleteCard: jest.fn(),
};

// Create card DTO
const createCardDto = {
  listId: 1,
  title: 'Test Title',
  description: 'Test Description',
  color: '#FFFFFF',
};

// Update card DTO
const updateCardDto: UpdateCardDto = {
  title: 'Test Title',
  description: 'Test Description',
  color: '#FFFFFF',
  startDate: new Date(),
  dueDate: new Date(),
};

// Board Repository Mocking
const mockBoardsRepository = () => ({
  find: jest.fn(),
});

describe('CardsController', () => {
  let controller: CardsController;
  let service: CardsService;

  beforeEach(async () => {
    // 테스트 전에 임시 데이터 초기화
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        { provide: CardsService, useValue: mockCardsService },
        { provide: getRepositoryToken(Board), useValue: mockBoardsRepository },
      ],
    }).compile();

    controller = module.get<CardsController>(CardsController);
    service = module.get<CardsService>(CardsService);
  });

  // 테스트 후에 임시 데이터 초기화
  afterAll(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createCard', () => {
    it('should create card', async () => {
      // GIVEN
      // 필요한 설정을 하는 부분
      const createCardResult = {
        id: 1,
        listId: 1,
        title: 'Test Title',
        description: 'Test Description',
        color: '#FFFFFF',
        createdAt: '2024-07-05T23:08:07.001Z',
        updatedAt: '2024-07-05T23:08:07.001Z',
      };
      const req = { user: { id: 1 } };

      // 모킹된 서비스 코드의 반환값을 설정하는 부분
      mockCardsService.createCard.mockResolvedValue(createCardResult);

      // WHEN
      // 실제로 컨트롤러의 메서드를 동작시키는 부분
      // 컨트롤러 메서드의 매개변수로 req, createCardDto를 사용
      const response = await controller.createCard(createCardDto, req);

      // THEN
      // 테스트 진행하는 부분
      // 컨트롤러 메서드가 1번 실행되었는지 확인
      expect(mockCardsService.createCard).toHaveBeenCalledTimes(1);
      // 실행 결과값과 임의의 반환값이 같은지 확인
      expect(response).toEqual(createCardResult);
      // 서비스의 메서드를 호출할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockCardsService.createCard).toHaveBeenCalledWith(createCardDto, req.user);
    });

    it('should get card detail', async () => {
      // GIVEN
      const getCardDetailResult = {
        id: 1,
        listId: 1,
        title: 'Test Title',
        description: 'Test Description',
        color: '#FFFFFF',
        createdAt: '2024-07-05T23:08:07.001Z',
        updatedAt: '2024-07-05T23:08:07.001Z',
        assign: [
          {
            cardId: 1,
            assignorId: 1, // 할당한 사람 ID
            assigneeId: 2, // 할당된 사람 ID
          },
          {
            cardId: 1,
            assignorId: 1, // 할당한 사람 ID
            assigneeId: 3, // 할당된 사람 ID
          },
        ],
      };
      const req = { params: { cardId: 1 }, user: { id: 1 } };

      mockCardsService.getCardDetail.mockResolvedValue(getCardDetailResult);

      // WHEN
      const response = await controller.getCardDetail(req.params.cardId);

      // THEN
      expect(mockCardsService.getCardDetail).toHaveBeenCalledTimes(1);
      expect(response).toEqual(getCardDetailResult);
      expect(mockCardsService.getCardDetail).toHaveBeenCalledWith(req.params.cardId);
    });

    it('should update card', async () => {
      // GIVEN
      const updateCardResult = {
        status: 201,
        message: '카드 수정에 성공했습니다.',
      };
      const req = { params: { cardId: 1 }, user: { id: 1 } };

      mockCardsService.updateCard.mockResolvedValue(updateCardResult);

      // WHEN
      const response = await controller.updateCard(req.params.cardId, updateCardDto);

      // THEN
      expect(mockCardsService.updateCard).toHaveBeenCalledTimes(1);
      expect(response).toEqual(updateCardResult);
      expect(mockCardsService.updateCard).toHaveBeenCalledWith(
        req.params.cardId,
        updateCardDto
      );
    });

    it('should delete card', async () => {
      // GIVEN
      const deleteCardResult = {
        status: 201,
        message: '카드 삭제에 성공했습니다.',
      };
      const req = { params: { cardId: 1 }, user: { id: 1 } };

      mockCardsService.deleteCard.mockResolvedValue(deleteCardResult);

      // WHEN
      const response = await controller.deleteCard(req.params.cardId);

      // THEN
      expect(mockCardsService.deleteCard).toHaveBeenCalledTimes(1);
      expect(response).toEqual(deleteCardResult);
      expect(mockCardsService.deleteCard).toHaveBeenCalledWith(req.params.cardId);
    });
  });
});
