import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { User } from 'src/users/entities/user.entity';
import { Board } from 'src/boards/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Board])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
