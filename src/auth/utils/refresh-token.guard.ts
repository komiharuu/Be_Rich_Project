import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AUTH_CONSTANT } from 'src/constants/Auth/auth.constant';
import { AUTH_MESSAGE_CONSTANT } from 'src/constants/Auth/auth-message.constant';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // 헤더에서 Refresh 토큰 가져옴
    const authorization = request.headers[AUTH_CONSTANT.REFRESH_TOKEN_GUARD.HEADERS];
    if (!authorization) throw new BadRequestException(AUTH_MESSAGE_CONSTANT.COMMON.INVALID_AUTH);

    // Refresh 토큰이 Bearer 형식인지 확인
    const [tokenType, token] = authorization.split(' ');
    if (tokenType !== AUTH_CONSTANT.COMMON.JWT.BEARER)
      throw new BadRequestException(AUTH_MESSAGE_CONSTANT.COMMON.INVALID_TYPE);

    try {
      // 서버에서 발급한 JWT가 맞는지 검증
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_SECRET_KEY,
      });

      // JWT에서 꺼낸 userId로 실제 사용자가 있는지 확인
      const user = await this.usersService.getUserById(payload.id);
      if (!user) throw new NotFoundException(AUTH_MESSAGE_CONSTANT.COMMON.USER_NOT_FOUND);

      // DB에 저장 된 RefreshToken이 전달 받은 값과 일치하지 않는 경우
      if (user.refreshToken !== token) {
        throw new UnauthorizedException(AUTH_MESSAGE_CONSTANT.COMMON.INVALID_AUTH);
      }

      request[AUTH_CONSTANT.REFRESH_TOKEN_GUARD.USER] = user;
    } catch {
      throw new UnauthorizedException(AUTH_MESSAGE_CONSTANT.COMMON.INVALID_AUTH);
    }
    return true;
  }
}
