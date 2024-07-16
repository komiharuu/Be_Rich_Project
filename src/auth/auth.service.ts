import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import _ from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // 회원가입
  async signUp(signUpDto: SignUpDto) {
    const { email, password, passwordCheck, nickname } = signUpDto;

    if (password !== passwordCheck) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    // 이메일 중복 체크
    let existedUser = await this.usersService.getUserByEmail(email);
    if (existedUser) {
      throw new ConflictException('중복된 이메일입니다.');
    }

    // 닉네임 중복 체크
    existedUser = await this.usersService.getUserByNickname(nickname);
    if (existedUser) {
      throw new ConflictException('중복된 닉네임입니다.');
    }

    // 비밀번호 암호화
    const hashedPassword = await hash(password, 10);

    // 사용자 데이터베이스에 저장
    const user = await this.usersService.createUser(email, hashedPassword, nickname);

    // 비밀번호 제외하고 반환
    user.password = undefined;
    return user;
  }

  // 사용자 검증
  async validateUser({ email, password }) {
    // 이메일로 사용자 조회 (비밀번호 있는 데이터 가져오기)
    const user = await this.usersService.getUserByEmail(email, true);
    if (_.isNil(user) || user.isDeleted) {
      throw new NotFoundException('해당하는 사용자가 없습니다.');
    }

    // 암호화된 비밀번호 일치 검사
    const isComparePassword = await compare(password, user.password);
    if (!isComparePassword) {
      throw new UnauthorizedException('인증된 사용자가 아닙니다.');
    }

    return user;
  }

  // 로그인
  async signIn(userId: number) {
    // 중간 과정은 AuthGuard('local')에서 처리
    // 토큰 발급
    const accessToken = this.jwtService.sign({ id: userId }, { expiresIn: '12h' });
    const refreshToken = this.jwtService.sign(
      { id: userId },
      { secret: process.env.REFRESH_SECRET_KEY }
    );

    // Refresh Token 저장
    await this.usersService.saveRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }

  // 로그아웃
  async signOut(userId: number) {
    // 이미 로그아웃되었는지 확인
    const user = await this.usersService.getUserById(userId);

    if (user.refreshToken === '') {
      throw new BadRequestException('이미 로그아웃한 상태입니다.');
    }

    // Refresh Token 삭제 (soft delete)
    await this.usersService.deleteRefreshToken(userId);

    return { message: '로그아웃에 성공했습니다.' };
  }

  // 토큰 재발급
  async reissue(userId: number) {
    // 토큰 발급
    const accessToken = this.jwtService.sign({ id: userId }, { expiresIn: '12h' });
    const refreshToken = this.jwtService.sign(
      { id: userId },
      { secret: process.env.REFRESH_SECRET_KEY }
    );

    // Refresh Token 저장
    await this.usersService.saveRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }
}
