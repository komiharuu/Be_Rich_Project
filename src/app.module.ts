import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { ListsModule } from './lists/lists.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { configModuleValidationSchema } from './configs/env-validation.config';
import { typeOrmModuleOptions } from './configs/database.config';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './redis/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configModuleValidationSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    AuthModule,
    UsersModule,
    BoardsModule,
    ListsModule,
    CardsModule,
    CommentsModule,
    RedisModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 전역 프리픽스 설정
    consumer.apply().forRoutes('api');
  }
}
