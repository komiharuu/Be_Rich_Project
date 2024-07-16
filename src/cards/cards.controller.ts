import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { GetCardListDto } from './dto/get-card-list.dto';
import { CARDMESSAGE } from 'src/constants/card-message.constant';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    HttpStatus.OK;

    return this.cardsService.createCard(createCardDto);
  }

  @Get()
  async getCardList(getCardListDto: GetCardListDto) {
    return this.cardsService.getCardList(getCardListDto);
  }

  @Get(':cardId')
  async getCardDetail(
    @Param('cardId') cardId: number,
    assignment_id: number,
    collaborator_id: number
  ) {
    return this.cardsService.getCardDetail(cardId, assignment_id, collaborator_id);
  }

  @Patch(':cardId')
  async updateCard(@Param('cardId') cardId: number, @Body() updateCardDto: UpdateCardDto) {
    await this.cardsService.updateCard(cardId, updateCardDto);
    return { statusCode: HttpStatus.CREATED, message: CARDMESSAGE.SUCCESS.UPDATE };
  }

  @Delete(':cardId')
  async deleteCard(@Param('cardId') cardId: number) {
    await this.cardsService.deleteCard(cardId);
    return { statusCode: HttpStatus.CREATED, message: CARDMESSAGE.SUCCESS.DELETE };
  }
}
