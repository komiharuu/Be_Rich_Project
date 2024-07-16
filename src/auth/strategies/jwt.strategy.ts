import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import _ from 'lodash';
import { JwtPayLoad } from '../interfaces/jwt-payload.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: JwtPayLoad) {
    const user = await this.userService.getUserById(payload.id);
    if (_.isNil(user) || user.id !== payload.id) {
      throw new NotFoundException('인증된 사용자가 없습니다.');
    }

    return user;
  }
}
