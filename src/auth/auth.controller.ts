import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenGuard } from './utils/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/sign-in')
  async signIn(@Req() req: any) {
    return await this.authService.signIn(req.user.id);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/sign-out')
  async signOut(@Req() req: any) {
    return await this.authService.signOut(req.user.id);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/reissue')
  async reissue(@Req() req: any) {
    return await this.authService.reissue(req.user.id);
  }
}
