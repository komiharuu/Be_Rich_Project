import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';
import { EmailService } from 'src/redis/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, User]),
    CacheModule.register(),
    UsersModule,
    RedisModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService, UsersService, RedisService, EmailService],
  exports: [TypeOrmModule],
})
export class BoardsModule {}
