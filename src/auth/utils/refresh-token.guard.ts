import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // 헤더에서 Refresh 토큰 가져옴
    const authorization = request.headers['authorization'];
    if (!authorization) throw new BadRequestException('잘못된 인증입니다.');

    // Refresh 토큰이 Bearer 형식인지 확인
    const [tokenType, token] = authorization.split(' ');
    if (tokenType !== 'Bearer') throw new BadRequestException('잘못된 토큰 타입입니다.');

    try {
      // 서버에서 발급한 JWT가 맞는지 검증
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_SECRET_KEY,
      });

      // JWT에서 꺼낸 userId로 실제 사용자가 있는지 확인
      const user = await this.usersService.getUserById(payload.id);
      if (!user) throw new NotFoundException('해당하는 인증의 사용자가 없습니다.');

      // DB에 저장 된 RefreshToken이 전달 받은 값과 일치하지 않는 경우
      if (user.refreshToken !== token) {
        throw new UnauthorizedException('잘못된 인증입니다.');
      }

      request['user'] = user;
    } catch {
      throw new UnauthorizedException('잘못된 인증입니다.');
    }
    return true;
  }
}
