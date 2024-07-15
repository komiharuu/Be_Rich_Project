import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListService } from './lists.service';
import { ListsController } from './lists.controller';
import { List } from './entities/list.entity';
import { User } from '../users/entities/user.entity';
import { Board } from '../boards/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List, User, Board])],
  controllers: [ListsController],
  providers: [ListService],
})
export class ListsModule {}
