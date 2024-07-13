import { Test, TestingModule } from '@nestjs/testing';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
// import { CreateListDto } from './dto/create-list.dto';

// ListsService Mocking
const mockListsService = {
  createList: jest.fn(),
  getLists: jest.fn(),
  updateList: jest.fn(),
  deleteList: jest.fn(),
};

// List Create DTO
const createListDto = {
  title: 'Test',
};

// List Update DTO
const updateListDto = {
  title: 'Updated Test',
};

describe('ListsController', () => {
  let controller: ListsController;
  let service: ListsService;

  beforeEach(async () => {
    // 테스트 전에 임시 데이터 초기화
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListsController],
      providers: [{ provide: ListsService, useValue: mockListsService }],
    }).compile();

    controller = module.get<ListsController>(ListsController);
    service = module.get<ListsService>(ListsService);
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

  describe('createList', () => {
    it('should create list', async () => {
      // GIVEN
      const createListResult = {
        id: 1,
        title: 'Test List',
        createdAt: '2024-07-05T23:08:07.001Z',
        updatedAt: '2024-07-05T23:08:07.001Z',
      };

      // WHEN
      mockListsService.createList.mockResolvedValue(createListResult);

      // THEN
      const response = await controller.createList(createListDto);
      expect(response).toBe(createListResult);
      expect(mockListsService.createList).toHaveBeenCalledWith(createListDto);
    });
  });

  describe('getLists', () => {
    it('should get list', async () => {
      // GIVEN
      const getListsResult = [
        {
          id: 1,
          title: 'Test 1',
          createdAt: '2024-07-05T23:08:07.001Z',
          updatedAt: '2024-07-05T23:08:07.001Z',
        },
        {
          id: 2,
          title: 'Test 2',
          createdAt: '2024-07-05T23:08:07.001Z',
          updatedAt: '2024-07-05T23:08:07.001Z',
        },
      ];

      // WHEN
      mockListsService.getLists.mockResolvedValue(getListsResult);

      // THEN
      const response = await controller.getLists();
      expect(response).toHaveBeenCalledTimes(1);
      expect(response).toBeInstanceOf(Array);
      expect(response).toBe(getListsResult);
    });
  });

  describe('updateList', () => {
    it('should update list', async () => {
      // GIVEN
      const updateListResult = {
        status: 201,
        message: '리스트 수정에 성고했습니다.',
      };
      const req = { params: { listId: 1 } };

      // WHEN
      mockListsService.updateList.mockResolvedValue(updateListResult);

      // THEN
      const response = await controller.updateList(req.params.listId, updateListDto);
      expect(response).toHaveBeenCalledTimes(1);
      expect(response).toBe(updateListResult);
      expect(mockListsService.updateList).toHaveBeenCalledWith(req.params.listId);
    });
  });

  describe('deleteList', () => {
    it('should delete list', async () => {
      // GIVEN
      const deleteListResult = {
        status: 201,
        message: '리스트 삭제에 성공했습니다.',
      };
      const req = { params: { listId: 1 } };

      // WHEN
      mockListsService.deleteList.mockResolvedValue(deleteListResult);

      // THEN
      const response = await controller.deleteList(req.params.listId);
      expect(response).toHaveBeenCalledTimes(1);
      expect(response).toBe(deleteListResult);
      expect(mockListsService.deleteList).toHaveBeenCalledWith(req.params.listId);
    });
  });
});
