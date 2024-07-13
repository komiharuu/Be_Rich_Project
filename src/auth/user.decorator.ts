// auth/user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity'; // 실제 사용자 엔터티 경로에 맞게 수정해야 합니다.

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest();
  return request.user; // request.user는 JWT 가드(AuthGuard('jwt'))에서 설정한 사용자 객체입니다.
});
