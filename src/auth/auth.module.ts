import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AUTH_CONSTANT } from 'src/constants/Auth/auth.constant';

@Module({
  imports: [
    // Passport 모듈을 다른 auth 모듈에서 사용하기 위한 코드
    PassportModule.register({
      defaultStrategy: AUTH_CONSTANT.COMMON.PASSPORT.DEFAULT_STRATEGY,
      session: false,
    }),
    // JwtModule이라는 동적 모듈을 설정하고 다른 auth 모듈에서 사용하기 위한 코드
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(AUTH_CONSTANT.COMMON.JWT.KEY_NAME),
        signOptions: { expiresIn: AUTH_CONSTANT.COMMON.JWT.EXPIRES_IN },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [JwtStrategy, AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
