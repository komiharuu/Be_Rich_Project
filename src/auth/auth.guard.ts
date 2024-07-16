import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('인증 정보가 없습니다.');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload; 
      return true;
    } catch {
      throw new UnauthorizedException('유효하지 않은 인증 정보입니다.');
    }
  }

  private extractToken(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }

    const accessTokenFromBody = request.body?.accessToken;
    if (accessTokenFromBody) {
      return accessTokenFromBody;
    }

    return null;
  }
}

