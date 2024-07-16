import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { AUTH_MESSAGE_CONSTANT } from 'src/constants/Auth/auth-message.constant';
import { AUTH_CONSTANT } from 'src/constants/Auth/auth.constant';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: AUTH_CONSTANT.LOCAL_STRATEGY.USER_NAME_FIELD,
      passwordField: AUTH_CONSTANT.LOCAL_STRATEGY.PASSWORD_FIELD,
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser({ email, password });

    if (!user) {
      throw new UnauthorizedException(AUTH_MESSAGE_CONSTANT.COMMON.USER_UNAUTHORIZED);
    }

    return user;
  }
}
