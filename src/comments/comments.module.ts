import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comment.entity';
import { Board } from 'src/boards/entities/board.entity';
import { Card } from 'src/cards/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Board, Card])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
