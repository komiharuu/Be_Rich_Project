import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// AuthService Mocking
const mockAuthService = {
  signUp: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  reissue: jest.fn(),
};

// Auth sign-up DTO
interface IUserSignUp {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  profile: string;
}
// 가짜 값 설정
const signUpDto: IUserSignUp = {
  email: 'test@test.com',
  password: '123123',
  passwordCheck: '123123',
  nickname: 'Test',
  profile: 'test_profile_image_url',
};

// Auth sign-in DTO
interface IUserSignIn {
  email: string;
  password: string;
}
// 가짜 값 설정
const signInDto: IUserSignIn = {
  email: 'test@test.com',
  password: '123123',
};

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
      providers: [{ provide: AuthService, useValue: mockAuthService }],
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
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should sign up', async () => {
      // GIVEN
      const signUpResult = {
        id: 1,
        email: 'test@test.com',
        nickname: 'Test',
        profile: 'test_profile_image_url',
        createdAt: '2024-07-05T23:08:07.001Z',
        updatedAt: '2024-07-05T23:08:07.001Z',
      };

      // WHEN
      // 모킹된 서비스의 signUp메서드를 실행하면 signUpResult 값을 반환한다는 의미
      mockAuthService.signUp.mockResolvedValue(signUpResult);

      // THEN
      // 컨트롤러의 실제 signUp 메서드의 결과가 signUpResult와 같은지 확인
      expect(await controller.signUp(signUpDto)).toBe(signUpResult);
      // 컨트롤러에서 서비스의 sinUp 메서드를 사용할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockAuthService.signUp).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('signIn', () => {
    it('should return tokens', async () => {
      // GIVEN
      const signInResult = {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      };

      // WHEN
      // 모킹된 서비스의 signIn메서드를 실행하면 signInResult 값을 반환한다는 의미
      mockAuthService.signIn.mockResolvedValue(signInResult);

      // THEN
      const response = await controller.signIn(signInDto);
      // 컨트롤러의 실제 signIn 메서드의 결과에 accessToken이 있는지 확인
      expect(response).toHaveProperty('accessToken');
      // 컨트롤러의 실제 signIn 메서드의 결과에 accessToken이 있는지 확인
      expect(response).toHaveProperty('refreshToken');
      // 컨트롤러의 실제 signIn 메서드의 accessToken이 문자열인지 확인
      expect(typeof response.accessToken).toBe('string');
      // 컨트롤러의 실제 signIn 메서드의 refreshToken이 문자열인지 확인
      expect(typeof response.refreshToken).toBe('string');
      // 컨트롤러에서 서비스의 signIn 메서드를 사용할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockAuthService.signIn).toHaveBeenCalledWith(signInDto);
    });
  });
});
