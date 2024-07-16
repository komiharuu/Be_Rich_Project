import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { BadRequestException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// 모킹된 bcrypt의 메서드 정의
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

const mockUsersService = {
  getUserById: jest.fn(),
  getUserByEmail: jest.fn(),
  getUserByNickname: jest.fn(),
  createUser: jest.fn(),
  saveRefreshToken: jest.fn(),
  deleteRefreshToken: jest.fn(),
};

const mockUsersRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

// Sign Up DTO
const signUpDto: SignUpDto = {
  email: 'test12@test.com',
  password: '123123',
  passwordCheck: '123123',
  nickname: 'Test12',
};

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let signUpDtoObject: SignUpDto;

  beforeEach(async () => {
    // 테스트 전에 임시 데이터 초기화
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        JwtService,
        { provide: getRepositoryToken(User), useValue: mockUsersRepository() },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  // 테스트 후에 임시 데이터 초기화
  afterAll(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('signUp', () => {
    beforeEach(async () => {
      // 해당 메서드의 매개변수
      signUpDtoObject = signUpDto;
    });

    it('If not match password and passwordCheck', () => {
      // GIVEN
      const invalidSignUpDto = { ...signUpDto, passwordCheck: 'different' };
      // WHEN
      const response = authService.signUp(invalidSignUpDto);
      // THEN
      expect(response).rejects.toThrow(BadRequestException);
      expect(response).rejects.toThrow('비밀번호가 일치하지 않습니다.');
    });

    it('If email conflict', async () => {
      // GIVEN
      mockUsersService.getUserByEmail.mockResolvedValueOnce({});
      // WHEN
      const response = authService.signUp(signUpDtoObject);
      // THEN
      expect(response).rejects.toThrow(ConflictException);
      expect(response).rejects.toThrow('중복된 이메일입니다.');
    });

    it('If nickname conflict', async () => {
      // GIVEN
      mockUsersService.getUserByEmail.mockResolvedValueOnce(undefined);
      mockUsersService.getUserByNickname.mockResolvedValueOnce({});
      // WHEN
      const response = authService.signUp(signUpDtoObject);
      // THEN
      expect(response).rejects.toThrow(ConflictException);
      expect(response).rejects.toThrow('중복된 닉네임입니다.');
    });

    it('should create user', async () => {
      // GIVEN
      const user = {
        id: 1,
        email: 'test12@test.com',
        nickname: 'Test12',
        profileImg: 'test_profile_image_url',
        createdAt: '2024-07-05T23:08:07.001Z',
        updatedAt: '2024-07-05T23:08:07.001Z',
      };
      mockUsersService.createUser.mockResolvedValue(user);

      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() => Promise.resolve(signUpDtoObject.password));

      // WHEN
      const response = await authService.signUp(signUpDto);

      // THEN
      expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(signUpDtoObject.email);
      expect(mockUsersService.getUserByNickname).toHaveBeenCalledWith(signUpDtoObject.nickname);
      expect(response).toEqual({ ...user, password: undefined });
      expect(mockUsersService.createUser).toHaveBeenCalledWith(
        signUpDtoObject.email,
        signUpDtoObject.password,
        signUpDtoObject.nickname
      );
    });
  });

  describe('signIn', () => {
    let userId: number;
    beforeEach(async () => {
      userId = 1;
    });

    it('should sign in', async () => {
      // GIVEN
      const mockToken = {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      };
      jest.spyOn(jwtService, 'sign').mockImplementation((payload, options) => {
        if (options?.expiresIn) {
          return mockToken.accessToken;
        } else {
          return mockToken.refreshToken;
        }
      });

      // WHEN
      const response = await authService.signIn(userId);

      // THEN
      expect(jwtService.sign).toHaveBeenCalledTimes(2);
      expect(jwtService.sign).toHaveBeenCalledWith({ id: userId }, { expiresIn: '12h' });
      expect(jwtService.sign).toHaveBeenCalledWith(
        { id: userId },
        { secret: process.env.REFRESH_SECRET_KEY }
      );
      expect(mockUsersService.saveRefreshToken).toHaveBeenCalledWith(
        userId,
        mockToken.refreshToken
      );
      expect(response).toEqual(mockToken);
    });
  });

  describe('signOut', () => {
    let userId: number;
    beforeEach(async () => {
      userId = 1;
    });
    it('If already sign out', async () => {
      // GIVEN
      const user = {
        id: 1,
        refreshToken: '',
      };
      mockUsersService.getUserById.mockResolvedValue(user);

      // WHEN
      const response = authService.signOut(userId);

      // THEN
      expect(response).rejects.toThrow(BadRequestException);
      expect(response).rejects.toThrow('이미 로그아웃한 상태입니다.');
    });

    it('should sign out', async () => {
      // GIVEN
      const signOutResult = {
        status: 201,
        message: '로그아웃에 성공했습니다.',
      };
      mockUsersService.getUserById.mockResolvedValue(signOutResult);

      // WHEN
      const response = await authService.signOut(userId);

      // THEN
      expect(mockUsersService.getUserById).toHaveBeenCalledWith(userId);
      expect(mockUsersService.deleteRefreshToken).toHaveBeenCalledWith(userId);
      expect(response).toEqual(signOutResult);
    });
  });

  describe('reissue', () => {
    let userId: number;
    beforeEach(async () => {
      userId = 1;
    });
    it('should reissue', async () => {
      // GIVEN
      const mockToken = {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      };
      jest.spyOn(jwtService, 'sign').mockImplementation((payload, options) => {
        if (options?.expiresIn) {
          return mockToken.accessToken;
        } else {
          return mockToken.refreshToken;
        }
      });

      // WHEN
      const response = await authService.reissue(userId);

      // THEN
      expect(jwtService.sign).toHaveBeenCalledTimes(2);
      expect(jwtService.sign).toHaveBeenCalledWith({ id: userId }, { expiresIn: '12h' });
      expect(jwtService.sign).toHaveBeenCalledWith(
        { id: userId },
        { secret: process.env.REFRESH_SECRET_KEY }
      );
      expect(mockUsersService.saveRefreshToken).toHaveBeenCalledWith(
        userId,
        mockToken.refreshToken
      );
      expect(response).toEqual(mockToken);
    });
  });
});
