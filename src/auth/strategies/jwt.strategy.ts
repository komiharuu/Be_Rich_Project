import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import _ from 'lodash';
import { JwtPayLoad } from '../interfaces/jwt-payload.interface';
import { UsersService } from 'src/users/users.service';
import { AUTH_CONSTANT } from 'src/constants/Auth/auth.constant';
import { AUTH_MESSAGE_CONSTANT } from 'src/constants/Auth/auth-message.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(AUTH_CONSTANT.COMMON.JWT.KEY_NAME),
    });
  }

  async validate(payload: JwtPayLoad) {
    const user = await this.userService.getUserById(payload.id);
    if (_.isNil(user) || user.id !== payload.id) {
      throw new NotFoundException(AUTH_MESSAGE_CONSTANT.COMMON.USER_NOT_FOUND);
    }

    return user;
  }
}
