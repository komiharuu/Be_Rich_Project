import { Module } from '@nestjs/common';
import { ListService } from './lists.service';
import { ListsController } from './lists.controller';

@Module({
  controllers: [ListsController],
  providers: [ListService],
})
export class ListsModule {}
