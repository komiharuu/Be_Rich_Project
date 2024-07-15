import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { GetCardListDto } from './dto/get-card-list.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    HttpStatus.OK;

    return this.cardsService.createCard(createCardDto);
  }

  @Get()
  getCardList(getCardListDto: GetCardListDto) {
    return this.cardsService.getCardList(getCardListDto);
  }

  @Get(':cardId')
  getCardDetail(@Param('cardId') cardId: number, assignment_id: number, collaborator_id: number) {
    return this.cardsService.getCardDetail(cardId, assignment_id, collaborator_id);
  }

  @Patch(':cardId')
  updateCard(@Param('cardId') cardId: number, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.updateCard(cardId, updateCardDto);
  }

  @Delete(':cardId')
  deleteCard(@Param('cardId') cardId: number) {
    return this.cardsService.deleteCard(cardId);
  }
}
