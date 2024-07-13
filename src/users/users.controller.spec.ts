import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

// UserService Mocking
const mockUsersService = {
  getUserInfo: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

// User update DTO
// 테스트용 값 설정
const updateUserDto: UpdateUserDto = {
  nickname: 'test',
  profileImg: 'https://s3.ap-northeast-2.amazonaws.com/mymycode/test/2024-7-10_04175252.png',
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    // 테스트 전에 임시 데이터 초기화
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    // 테스트 모듈 생성
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  // 테스트 후에 임시 데이터 초기화
  afterAll(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserInfo', () => {
    it('should get user info', async () => {
      // GIVEN
      const getUserInfoResult = {
        id: 1,
        email: 'test@test.com',
        nickname: 'Test',
        profile: 'test_profile_image_url',
        createdAt: '2024-07-05T23:08:07.001Z',
        updatedAt: '2024-07-05T23:08:07.001Z',
      };

      // WHEN
      mockUsersService.getUserInfo.mockResolvedValue(getUserInfoResult);

      // THEN
      const response = await controller.getUserInfo();
      expect(response).not.toBe(undefined);
      expect(response).toBeInstanceOf(Object);
      expect(response).toHaveProperty('email');
      expect(response).toHaveProperty('nickname');
      expect(response).toHaveProperty('profileImg');
    });
  });

  describe('updateUser', () => {
    it('should get user info', async () => {
      // GIVEN
      const updateUserResult = {
        status: 201,
        message: '사용자 프로필 수정에 성공했습니다.',
      };
      const req = { user: { id: 1 } };

      // WHEN
      mockUsersService.updateUser.mockResolvedValue(updateUserResult);

      // THEN
      const response = await controller.updateUser(req.user.id, updateUserDto);
      expect(response).toBe(updateUserResult);
      expect(response).toHaveBeenCalledWith(updateUserDto);
    });
  });

  describe('deleteUser', () => {
    it('should get user info', async () => {
      // GIVEN
      const deleteUserResult = {
        status: 201,
        message: '회원 탈퇴에 성공했습니다.',
      };
      const req = { user: { id: 1 } };

      // WHEN
      mockUsersService.deleteUser.mockResolvedValue(deleteUserResult);

      // THEN
      const response = await controller.deleteUser(req.user.id);
      expect(response).toBe(deleteUserResult);
      expect(response).toHaveBeenCalledWith(req.user.id);
    });
  });
});
