import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), UsersModule, CacheModule.register()],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [TypeOrmModule],
})
export class BoardsModule {}
