import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import _ from 'lodash';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { USERS_MESSAGE_CONSTANT } from 'src/constants/Users/users-message.constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  // 사용자 생성
  async createUser(email: string, password: string, nickname: string) {
    return await this.usersRepository.save({
      email,
      password,
      nickname,
    });
  }

  // 사용자 프로필 조회
  async getUserProfile(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user.isDeleted) {
      throw new BadRequestException(USERS_MESSAGE_CONSTANT.COMMON.IS_DELETED_USER);
    }
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      profileImg: user.profileImg,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // 사용자 ID로 사용자 조회
  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user.isDeleted) {
      throw new BadRequestException(USERS_MESSAGE_CONSTANT.COMMON.IS_DELETED_USER);
    }
    return user;
  }

  // 사용자 이메일로 사용자 조회 (중복 체크, 사용자 검증)
  async getUserByEmail(email: string, requiredPw: boolean = false) {
    return await this.usersRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: requiredPw,
        nickname: true,
      },
    });
  }

  // 사용자 닉네임으로 사용자 조회 (중복 체크)
  async getUserByNickname(nickname: string) {
    return await this.usersRepository.findOne({
      where: { nickname },
    });
  }

  // Refresh Token 저장(수정)
  async saveRefreshToken(id: number, refreshToken: string) {
    await this.usersRepository.update({ id }, { refreshToken });
    return;
  }

  // Refresh Token 삭제
  async deleteRefreshToken(id: number) {
    await this.usersRepository.update({ id }, { refreshToken: null });
    return;
  }

  // 사용자 프로필 수정
  async updateUserProfile(updateUserProfileDto: UpdateUserProfileDto, id: number) {
    const { nickname, profileImg } = updateUserProfileDto;
    if (!_.isNil(nickname)) {
      const existingUser = await this.getUserByNickname(nickname);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(USERS_MESSAGE_CONSTANT.UPDATE_USER.CONFLICT_EMAIL);
      }
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (user.isDeleted) {
      throw new BadRequestException(USERS_MESSAGE_CONSTANT.COMMON.IS_DELETED_USER);
    }
    user.nickname = nickname ?? user.nickname;
    user.profileImg = profileImg ?? user.profileImg;

    await this.usersRepository.save(user);

    return {
      status: HttpStatus.OK,
      message: USERS_MESSAGE_CONSTANT.UPDATE_USER.SUCCEED,
    };
  }

  // 사용자 회원 탈퇴 (soft delete)
  async deleteUserProfile(id: number) {
    await this.usersRepository.update({ id }, { refreshToken: null, isDeleted: true });
    return {
      status: HttpStatus.OK,
      message: USERS_MESSAGE_CONSTANT.DELETE_USER.SUCCEED,
    };
  }
}
