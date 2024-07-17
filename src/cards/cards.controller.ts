import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Query,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CARDMESSAGE } from 'src/constants/card-message.constant';
import { AuthGuard } from '@nestjs/passport';
import { MoveCardDto } from './dto/move-card.dto';
import { User } from 'src/users/entities/user.entity';
import { Card } from './entities/card.entity';
import { BoardMemberGuard } from 'src/boards/guards/board-member.guard';
@UseGuards(AuthGuard('jwt'), BoardMemberGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  // 카드 생성
  @Post()
  createCard(@Body() createCardDto: CreateCardDto, @Req() req: any) {
    const user: User = req.user;
    return this.cardsService.createCard(createCardDto, user);
  }

  // 카드 상세조회
  @Get('/:cardId')
  async getCardDetail(@Param('cardId') cardId: number) {
    return this.cardsService.getCardDetail(cardId);
  }

  // 카드 수정
  @Patch('/:cardId')
  async updateCard(@Param('cardId') cardId: number, @Body() updateCardDto: UpdateCardDto) {
    await this.cardsService.updateCard(cardId, updateCardDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: CARDMESSAGE.SUCCESS.UPDATE,
      cardId,
      ...updateCardDto,
    };
  }

  // 카드 이동
  @Patch('/:cardId/move')
  async moveCard(@Param('cardId') cardId: number, @Body() moveCardDto: MoveCardDto): Promise<Card> {
    return this.cardsService.moveCard(moveCardDto, cardId);
  }

  // 카드 작업자 할당
  // @Patch('/:cardId')
  // async assignCard(@Param('cardId') cardId: number, @Body() updateCardDto: UpdateCardDto) {
  //   await this.cardsService.updateCard(cardId, updateCardDto);
  //   return {
  //     statusCode: HttpStatus.CREATED,
  //     message: CARDMESSAGE.SUCCESS.UPDATE,
  //     cardId,
  //     ...updateCardDto,
  //   };
  // }

  // 카드 삭제
  @Delete('/:cardId')
  async deleteCard(@Param('cardId') cardId: number) {
    await this.cardsService.deleteCard(cardId);
    return { statusCode: HttpStatus.CREATED, message: CARDMESSAGE.SUCCESS.DELETE };
  }
}
