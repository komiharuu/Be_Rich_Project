import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ReissueTokenDto } from './dto/reissue-token.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private users = [];
  private invalidRefreshTokens: Set<string> = new Set<string>();

  constructor(private jwtService: JwtService) {}

  async signUp(createUserDto: CreateUserDto) {
    const { email, password, passwordCheck, nickname } = createUserDto;

    if (password !== passwordCheck) {
      throw new BadRequestException('입력 한 두 비밀번호가 일치하지 않습니다.');
    }

    const existingUser = this.users.find(user => user.email === email);
    if (existingUser) {
      throw new BadRequestException('이미 가입된 사용자입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: this.users.length + 1,
      email,
      password: hashedPassword,
      nickname,
      role: 'USER',
      point: 1000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);

    return newUser;
  }

  async signIn(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    const user = this.users.find(user => user.email === email);
    if (!user) {
      throw new UnauthorizedException('인증 정보가 유효하지 않습니다.');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('인증 정보가 유효하지 않습니다.');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestException('리프레시 토큰이 필요합니다.');
    }

    const isValid = this.isValidRefreshToken(refreshToken);
    if (!isValid) {
      throw new BadRequestException('이미 로그아웃되었습니다.');
    }

    this.invalidRefreshTokens.add(refreshToken);

    return { message: '로그아웃에 성공했습니다.' };
  }

  private isValidRefreshToken(refreshToken: string): boolean {
    return !this.invalidRefreshTokens.has(refreshToken);
  }

  async reissueToken(reissueTokenDto: ReissueTokenDto) {
    const { refreshToken } = reissueTokenDto;
    try {
      if (!refreshToken) {
        throw new BadRequestException('인증 정보가 없습니다.');
      }

      if (!this.isValidRefreshToken(refreshToken)) {
        throw new NotFoundException('인증 정보와 일치하는 사용자가 없습니다.');
      }

      const decoded = this.jwtService.verify(refreshToken);
      const payload = { email: decoded.email, sub: decoded.sub };
      const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
      const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new UnauthorizedException('인증 정보가 유효하지 않습니다.');
    }
  }
}