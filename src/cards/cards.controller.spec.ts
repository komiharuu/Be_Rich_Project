import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { title } from 'process';

// ListsService Mocking
const mockCardsService = {
  createCard: jest.fn(),
  getCardList: jest.fn(),
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

// Get Card List DTO
const getCardListDto = {
  listId: 1,
};

// Update card DTO
const updateCardDto = {
  title: 'Test Title',
  description: 'Test Description',
  color: '#FFFFFF',
  assign: [
    {
      assignorId: 1, // 할당한 사람 ID
      assigneeId: 2, // 할당된 사람 ID
    },
    {
      assignorId: 1, // 할당한 사람 ID
      assigneeId: 3, // 할당된 사람 ID
    },
  ],
};

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
      providers: [{ provide: CardsService, useValue: mockCardsService }],
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

      // WHEN
      mockCardsService.createCard.mockResolvedValue(createCardResult);

      // THEN
      const response = await controller.createCard(req, createCardDto);
      expect(response).toHaveBeenCalledTimes(1);
      expect(response).toBe(createCardResult);
      expect(mockCardsService.createCard).toHaveBeenCalledWith(req.user.id, createCardDto);
    });

    it('should get card list', async () => {
      // GIVEN
      const getCardListResult = [
        {
          id: 1,
          listId: 1,
          title: 'Test Title 1',
          createdAt: '2024-07-05T23:08:07.001Z',
          updatedAt: '2024-07-05T23:08:07.001Z',
        },
        {
          id: 2,
          listId: 1,
          title: 'Test Title 2',
          createdAt: '2024-07-05T23:08:07.001Z',
          updatedAt: '2024-07-05T23:08:07.001Z',
        },
      ];
      const req = { user: { id: 1 } };

      // WHEN
      mockCardsService.getCardList(getCardListResult);

      // THEN
      const response = await controller.getCardList(req, getCardListDto);
      expect(response).toHaveBeenCalledTimes(1);
      expect(response).toBeInstanceOf(Array);
      expect(response).toBe(getCardListResult);
      expect(mockCardsService.getCardList).toHaveBeenCalledWith(req.user.id, getCardListDto);
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

      // WHEN
      mockCardsService.getCardDetail(getCardDetailResult);

      // THEN
      const response = await controller.getCardDetail(req, req.params.cardId);
      expect(response).toHaveBeenCalledTimes(1);
      expect(response).toBe(getCardDetailResult);
      expect(mockCardsService.getCardDetail).toHaveBeenCalledWith(req.user.id, req.params.cardId);
    });

    it('should update card', async () => {
      // GIVEN
      const updateCardResult = {
        status: 201,
        message: '카드 수정에 성공했습니다.',
      };
      const req = { params: { cardId: 1 }, user: { id: 1 } };

      // WHEN
      mockCardsService.updateCard.mockResolvedValue(updateCardResult);

      // THEN
      const response = await controller.updateCard(req, req.params.cardId, updateCardDto);
      expect(response).toHaveBeenCalledTimes(1);
      expect(response).toBe(updateCardResult);
      expect(mockCardsService.updateCard).toHaveBeenCalledWith(
        req.user.id,
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

      // WHEN
      mockCardsService.deleteCard.mockResolvedValue(deleteCardResult);

      // THEN
      const response = await controller.deleteCard(req, req.params.cardId);
      expect(response).toHaveBeenCalledTimes(1);
      expect(response).toBe(deleteCardResult);
      expect(mockCardsService.deleteCard).toHaveBeenCalledWith(req.user.id, req.params.cardId);
    });
  });
});
