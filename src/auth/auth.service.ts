import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ReissueTokenDto } from './dto/reissue-token.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private users = [];

  constructor(private jwtService: JwtService) {}

  async signUp(createAuthDto: CreateAuthDto) {
    const { email, password, passwordConfirm, nickname } = createAuthDto;

    if (password !== passwordConfirm) {
      throw new BadRequestException('입력 한 두 비밀번호가 일치하지 않습니다.');
    }

    const existingUser = this.users.find(user => user.email === email);
    if (existingUser) {
      throw new BadRequestException('이미 가입 된 사용자입니다.');
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
    return { message: '로그아웃에 성공했습니다.' };
  }

  async reissueToken(reissueTokenDto: ReissueTokenDto) {
    const { refreshToken } = reissueTokenDto;
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const payload = { email: decoded.email, sub: decoded.sub };
      const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
      const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException('인증 정보가 유효하지 않습니다.');
    }
  }
}
