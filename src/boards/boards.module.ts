import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User]), CacheModule.register(), UsersModule],
  controllers: [BoardsController],
  providers: [BoardsService, UsersService],
  exports: [TypeOrmModule],
})
export class BoardsModule {}
