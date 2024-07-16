import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { USERS_TEST_CONSTANT, USERS_TEST_DUMMY } from 'src/constants/Users/users-test.constant';
import { USERS_MESSAGE_CONSTANT } from 'src/constants/Users/users-message.constant';
import { HttpStatus } from '@nestjs/common';

// UserService Mocking
const mockUsersService = {
  getUserProfile: jest.fn(),
  updateUserProfile: jest.fn(),
  deleteUserProfile: jest.fn(),
};

// User update DTO
// 테스트용 값 설정
const updateUserDto: UpdateUserProfileDto = USERS_TEST_DUMMY[0];

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
      const getUserInfoResult = USERS_TEST_DUMMY[1];
      // 임의의 req.user 객체
      const req = { user: { id: 1 } };

      // 모킹된 서비스 코드의 반환값을 설정하는 부분
      mockUsersService.getUserProfile.mockResolvedValue(getUserInfoResult);

      // WHEN
      // 실제로 컨트롤러의 메서드를 동작시키는 부분
      // 컨트롤러 메서드의 매개변수로 req를 사용
      const response = await controller.getUserProfile(req);

      // THEN
      // 테스트 진행하는 부분
      // 컨트롤러 메서드가 1번 실행되었는지 확인
      expect(mockUsersService.getUserProfile).toHaveBeenCalledTimes(1);
      // email 프로퍼티가 있는지 확인
      expect(response).toHaveProperty(USERS_TEST_CONSTANT.COMMON.EMAIL);
      // nickname 프로퍼티가 있는지 확인
      expect(response).toHaveProperty(USERS_TEST_CONSTANT.COMMON.NICKNAME);
      // profileImg 프로퍼티가 있는지 확인
      expect(response).toHaveProperty(USERS_TEST_CONSTANT.COMMON.PROFILE_IMG);
      // 실행 결과값과 임의의 반환값이 같은지 확인
      expect(response).toEqual(getUserInfoResult);
      // 서비스의 메서드를 호출할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockUsersService.getUserProfile).toHaveBeenCalledWith(req.user.id);
    });
  });

  describe('updateUser', () => {
    it('should get user info', async () => {
      // GIVEN
      const updateUserResult = {
        status: HttpStatus.OK,
        message: USERS_MESSAGE_CONSTANT.UPDATE_USER.SUCCEED,
      };
      const req = { user: { id: 1 } };

      mockUsersService.updateUserProfile.mockResolvedValue(updateUserResult);

      // WHEN
      const response = await controller.updateUserProfile(updateUserDto, req);

      // THEN
      expect(mockUsersService.updateUserProfile).toHaveBeenCalledTimes(1);
      expect(response).toEqual(updateUserResult);
      expect(mockUsersService.updateUserProfile).toHaveBeenCalledWith(updateUserDto, req.user.id);
    });
  });

  describe('deleteUser', () => {
    it('should get user info', async () => {
      // GIVEN
      const deleteUserResult = {
        status: HttpStatus.OK,
        message: USERS_MESSAGE_CONSTANT.DELETE_USER.SUCCEED,
      };
      const req = { user: { id: 1 } };

      mockUsersService.deleteUserProfile.mockResolvedValue(deleteUserResult);

      // WHEN
      const response = await controller.deleteUserProfile(req);

      // THEN
      expect(mockUsersService.deleteUserProfile).toHaveBeenCalledTimes(1);
      expect(response).toEqual(deleteUserResult);
      expect(mockUsersService.deleteUserProfile).toHaveBeenCalledWith(req.user.id);
    });
  });
});
