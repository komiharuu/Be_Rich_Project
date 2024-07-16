import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { EmailService } from 'src/boards/meilers/email.service';
import { EmailModule } from 'src/boards/meilers/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, User]),
    CacheModule.register(),
    UsersModule,
    EmailModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService, UsersService, EmailService],
  exports: [TypeOrmModule],
})
export class BoardsModule {}
