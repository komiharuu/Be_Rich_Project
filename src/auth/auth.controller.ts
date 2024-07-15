import { Controller, Post, Body, Headers, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ReissueTokenDto } from './dto/reissue-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      return this.authService.signUp(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  async signIn(@Body() loginAuthDto: LoginAuthDto) {
    if (!loginAuthDto.email) {
      throw new BadRequestException('이메일을 입력해 주세요.');
    }
    if (!loginAuthDto.password) {
      throw new BadRequestException('비밀번호를 입력해 주세요.');
    }

    try {
      return await this.authService.signIn(loginAuthDto);
    } catch (error) {
      throw new UnauthorizedException('인증 정보가 유효하지 않습니다.');
    }
  }

  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestException('리프레시 토큰이 필요합니다.');
    }
    try {
      return await this.authService.logout(refreshToken);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('reissue-token')
  async reissueToken(@Body() reissueTokenDto: ReissueTokenDto) {
    return this.authService.reissueToken(reissueTokenDto);
  }
}