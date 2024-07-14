import { Test, TestingModule } from '@nestjs/testing';
import { ListsController } from './lists.controller';
import { ListService } from './lists.service';
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
  boardId: 1,
  title: 'Test',
};

// Get Lists DTO
const getListsDto = {
  board: 1,
};

// List Update DTO
const updateListDto = {
  title: 'Updated Test',
};

describe('ListsController', () => {
  let controller: ListsController;
  let service: ListService;

  beforeEach(async () => {
    // 테스트 전에 임시 데이터 초기화
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListsController],
      providers: [{ provide: ListService, useValue: mockListsService }],
    }).compile();

    controller = module.get<ListsController>(ListsController);
    service = module.get<ListService>(ListService);
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

  // 리스트에 접근하는 사용자가 초대된 멤버거나 주인이 맞는지 확인하는 절차가 필요해 보임
  // 방법1. 메서드를 실행할 때마다 req를 통해 사용자 id를 받아와서 member테이블에서 비교
  // 방법2. 방법1의 내용을 가드 또는 인터셉터를 통해서 따로 선행처리

  describe('createList', () => {
    it('should create list', async () => {
      // GIVEN
      // 필요한 설정을 하는 부분
      const createListResult = {
        id: 1,
        title: 'Test List',
        createdAt: '2024-07-05T23:08:07.001Z',
        updatedAt: '2024-07-05T23:08:07.001Z',
      };
      const req = { user: { id: 1 } };

      // 모킹된 서비스 코드의 반환값을 설정하는 부분
      mockListsService.createList.mockResolvedValue(createListResult);

      // WHEN
      // 실제로 컨트롤러의 메서드를 동작시키는 부분
      // 컨트롤러 메서드의 매개변수로 req, createListDto를 사용
      const response = await controller.createList(req, createListDto);

      // THEN
      // 테스트 진행하는 부분
      // 컨트롤러 메서드가 1번 실행되었는지 확인
      expect(response).toHaveBeenCalledTimes(1);
      // 실행 결과값과 임의의 반환값이 같은지 확인
      expect(response).toBe(createListResult);
      // 서비스의 메서드를 호출할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockListsService.createList).toHaveBeenCalledWith(req.user.id, createListDto);
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
      const req = { user: { id: 1 } };

      mockListsService.getLists.mockResolvedValue(getListsResult);

      // WHEN
      const response = await controller.getLists(req, getListsDto);

      // THEN
      expect(response).toHaveBeenCalledTimes(1);
      // 결과값의 인스턴스가 배열인지 확인
      expect(response).toBeInstanceOf(Array);
      expect(response).toBe(getListsResult);
      expect(mockListsService.getLists).toHaveBeenCalledWith(req.user.id, getListsDto);
    });
  });

  describe('updateList', () => {
    it('should update list', async () => {
      // GIVEN
      const updateListResult = {
        status: 201,
        message: '리스트 수정에 성공했습니다.',
      };
      const req = { params: { listId: 1 }, user: { id: 1 } };

      mockListsService.updateList.mockResolvedValue(updateListResult);

      // WHEN
      const response = await controller.updateList(req, req.params.listId, updateListDto);

      // THEN
      expect(response).toHaveBeenCalledTimes(1);
      expect(response).toBe(updateListResult);
      expect(mockListsService.updateList).toHaveBeenCalledWith(
        req.user.id,
        req.params.listId,
        updateListDto
      );
    });
  });

  describe('deleteList', () => {
    it('should delete list', async () => {
      // GIVEN
      const deleteListResult = {
        status: 201,
        message: '리스트 삭제에 성공했습니다.',
      };
      const req = { params: { listId: 1 }, user: { id: 1 } };

      mockListsService.deleteList.mockResolvedValue(deleteListResult);

      // WHEN
      const response = await controller.deleteList(req, req.params.listId);

      // THEN
      expect(response).toHaveBeenCalledTimes(1);
      expect(response).toBe(deleteListResult);
      expect(mockListsService.deleteList).toHaveBeenCalledWith(req.user.id, req.params.listId);
    });
  });
});
