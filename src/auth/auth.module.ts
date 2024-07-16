import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // Passport 모듈을 다른 auth 모듈에서 사용하기 위한 코드
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    // JwtModule이라는 동적 모듈을 설정하고 다른 auth 모듈에서 사용하기 위한 코드
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '12h' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [JwtStrategy, AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
