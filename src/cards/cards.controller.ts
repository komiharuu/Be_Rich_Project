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
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CARDMESSAGE } from 'src/constants/card-message.constant';
import { AuthGuard } from '@nestjs/passport';
import { MoveCardDto } from './dto/move-card.dto';
import { User } from 'src/users/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto, @Req() req: any) {
    const user: User = req.user;
    return this.cardsService.createCard(createCardDto, user);
  }

  @Get()
  async getCardList() {
    return this.cardsService.getCardList();
  }

  @Get('/:cardId')
  async getCardDetail(
    @Param('cardId') cardId: number,
    assignment_id: number,
    collaborator_id: number
  ) {
    return this.cardsService.getCardDetail(cardId, assignment_id, collaborator_id);
  }

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

  @Patch('/:cardId/move')
  async moveCard(@Param('cardId') cardId: number, @Body() moveCardDto: MoveCardDto) {
    await this.cardsService.moveCard(cardId, moveCardDto);
    return { statusCode: HttpStatus.CREATED, message: CARDMESSAGE.SUCCESS.UPDATE };
  }

  @Delete('/:cardId')
  async deleteCard(@Param('cardId') cardId: number) {
    await this.cardsService.deleteCard(cardId);
    return { statusCode: HttpStatus.CREATED, message: CARDMESSAGE.SUCCESS.DELETE };
  }
}
