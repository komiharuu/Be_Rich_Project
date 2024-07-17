import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { AUTH_TEST_CONSTANT, AUTH_TEST_DUMMY } from 'src/constants/Auth/auth-test.constant';
import { HttpStatus } from '@nestjs/common';
import { AUTH_MESSAGE_CONSTANT } from 'src/constants/Auth/auth-message.constant';

// AuthService Mocking
const mockAuthService = {
  signUp: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  reissue: jest.fn(),
};

const mockRepository = () => ({
  find: jest.fn(),
});

// Auth sign-up DTO
const signUpDto: any = AUTH_TEST_DUMMY[0];

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    // 테스트 전에 임시 데이터 초기화
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    // 가짜 모듈 생성
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        JwtService,
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepository() },
      ],
    }).compile();

    // 만들어진 가짜 모듈에서의 service와 controller를 가져옴
    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
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

  describe('signUp', () => {
    it('should sign up', async () => {
      // GIVEN
      // 필요한 설정을 하는 부분
      const signUpResult = AUTH_TEST_DUMMY[1];

      // 모킹된 서비스의 signUp메서드를 실행하면 signUpResult 값을 반환한다는 의미
      mockAuthService.signUp.mockResolvedValue(signUpResult);

      // WHEN
      // 실제로 컨트롤러의 메서드를 동작시키는 부분
      // 컨트롤러 메서드의 매개변수로 signInDto를 사용
      const response = await controller.signUp(signUpDto);

      // THEN
      // 테스트 진행하는 부분
      // 컨트롤러 메서드가 1번 실행되었는지 확인
      expect(mockAuthService.signUp).toHaveBeenCalledTimes(1);
      // email 프로퍼티가 있는지 확인
      expect(response).toHaveProperty(AUTH_TEST_CONSTANT.COMMON.EMAIL);
      // nickname 프로퍼티가 있는지 확인
      expect(response).toHaveProperty(AUTH_TEST_CONSTANT.COMMON.NICKNAME);
      // profileImg 프로퍼티가 있는지 확인
      expect(response).toHaveProperty(AUTH_TEST_CONSTANT.COMMON.PROFILE_IMG);
      // 컨트롤러의 실제 signUp 메서드의 결과가 signUpResult와 같은지 확인
      expect(response).toEqual(signUpResult);
      // 컨트롤러에서 서비스의 sinUp 메서드를 사용할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockAuthService.signUp).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('signIn', () => {
    it('should return tokens', async () => {
      // GIVEN
      const signInResult = AUTH_TEST_DUMMY[2];
      const req = { user: { id: 1 } };

      // 모킹된 서비스의 signIn메서드를 실행하면 signInResult 값을 반환한다는 의미
      mockAuthService.signIn.mockResolvedValue(signInResult);

      // WHEN
      // 실제로 컨트롤러의 메서드를 동작시키는 부분
      // 컨트롤러 메서드의 매개변수로 signInDto를 사용
      const response = await controller.signIn(req);

      // THEN
      // 테스트 진행하는 부분
      // 컨트롤러 메서드가 1번 실행되었는지 확인
      expect(mockAuthService.signIn).toHaveBeenCalledTimes(1);
      // 컨트롤러의 실제 signIn 메서드의 결과에 accessToken이 있는지 확인
      expect(response).toHaveProperty(AUTH_TEST_CONSTANT.COMMON.ACCESS_TOKEN);
      // 컨트롤러의 실제 signIn 메서드의 결과에 accessToken이 있는지 확인
      expect(response).toHaveProperty(AUTH_TEST_CONSTANT.COMMON.REFRESH_TOKEN);
      // 컨트롤러의 실제 signIn 메서드의 accessToken이 문자열인지 확인
      expect(typeof response.accessToken).toBe(AUTH_TEST_CONSTANT.COMMON.STRING_TYPE);
      // 컨트롤러의 실제 signIn 메서드의 refreshToken이 문자열인지 확인
      expect(typeof response.refreshToken).toBe(AUTH_TEST_CONSTANT.COMMON.STRING_TYPE);
      // 실행 결과값과 임의의 반환값이 같은지 확인
      expect(response).toEqual(signInResult);
      // 컨트롤러에서 서비스의 signIn 메서드를 사용할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockAuthService.signIn).toHaveBeenCalledWith(req.user.id);
    });
  });

  describe('signOut', () => {
    it('should sign-out', async () => {
      // GIVEN
      const signOutResult = {
        status: HttpStatus.OK,
        message: AUTH_MESSAGE_CONSTANT.SIGN_OUT.SUCCEED,
      };
      const req = { user: { id: 1 } };

      mockAuthService.signOut.mockResolvedValue(signOutResult);

      // WHEN
      const response = await controller.signOut(req);

      // THEN
      expect(mockAuthService.signOut).toHaveBeenCalledTimes(1);
      expect(response).toEqual(signOutResult);
      expect(mockAuthService.signOut).toHaveBeenCalledWith(req.user.id);
    });
  });

  describe('reissue', () => {
    it('should reissue', async () => {
      // GIVEN
      const reissueResult = AUTH_TEST_DUMMY[2];
      const req = { user: { id: 1 } };

      mockAuthService.reissue.mockResolvedValue(reissueResult);

      // WHEN
      const response = await controller.reissue(req);

      // THEN
      expect(mockAuthService.reissue).toHaveBeenCalledTimes(1);
      expect(response).toEqual(reissueResult);
      expect(mockAuthService.reissue).toHaveBeenCalledWith(req.user.id);
    });
  });
});
