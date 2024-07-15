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
    // 컨트롤러와 서비스가 정의되어 있는지 확인 (있는지 확인)
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getUserInfo', () => {
    it('should get user info', async () => {
      // GIVEN
      // 필요한 설정을 하는 부분
      const getUserInfoResult = {
        id: 1,
        email: 'test@test.com',
        nickname: 'Test',
        profile: 'test_profile_image_url',
        createdAt: '2024-07-05T23:08:07.001Z',
        updatedAt: '2024-07-05T23:08:07.001Z',
      };
      // 임의의 req.user 객체
      const req = { user: { id: 1 } };

      // 모킹된 서비스 코드의 반환값을 설정하는 부분
      mockUsersService.getUserInfo.mockResolvedValue(getUserInfoResult);

      // WHEN
      // 실제로 컨트롤러의 메서드를 동작시키는 부분
      // 컨트롤러 메서드의 매개변수로 req를 사용
      const response = await controller.getUserInfo(req);

      // THEN
      // 테스트 진행하는 부분
      // 컨트롤러 메서드가 1번 실행되었는지 확인
      expect(mockUsersService.getUserInfo).toHaveBeenCalledTimes(1);
      // email 프로퍼티가 있는지 확인
      expect(response).toHaveProperty('email');
      // nickname 프로퍼티가 있는지 확인
      expect(response).toHaveProperty('nickname');
      // profileImg 프로퍼티가 있는지 확인
      expect(response).toHaveProperty('profileImg');
      // 실행 결과값과 임의의 반환값이 같은지 확인
      expect(response).toEqual(getUserInfoResult);
      // 서비스의 메서드를 호출할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockUsersService.getUserInfo).toHaveBeenCalledWith(req.user.id);
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

      mockUsersService.updateUser.mockResolvedValue(updateUserResult);

      // WHEN
      const response = await controller.updateUser(req, updateUserDto);

      // THEN
      expect(mockUsersService.updateUser).toHaveBeenCalledTimes(1);
      expect(response).toEqual(updateUserResult);
      expect(mockUsersService.updateUser).toHaveBeenCalledWith(req.user.id, updateUserDto);
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

      mockUsersService.deleteUser.mockResolvedValue(deleteUserResult);

      // WHEN
      const response = await controller.deleteUser(req);

      // THEN
      expect(mockUsersService.deleteUser).toHaveBeenCalledTimes(1);
      expect(response).toEqual(deleteUserResult);
      expect(mockUsersService.deleteUser).toHaveBeenCalledWith(req.user.id);
    });
  });
});
