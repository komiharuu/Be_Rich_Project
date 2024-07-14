import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ReissueTokenDto } from './dto/reissue-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('login')
  async signIn(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.signIn(loginAuthDto);
  }

  @Post('logout')
  async logout(@Headers('refreshToken') refreshToken: string) {
    return this.authService.logout(refreshToken);
  }

  @Post('reissue-token')
  async reissueToken(@Body() reissueTokenDto: ReissueTokenDto) {
    return this.authService.reissueToken(reissueTokenDto);
  }
}
