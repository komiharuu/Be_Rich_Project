import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { GetCardListDto } from './dto/get-card-list.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>
  ) {}

  // 카드 생성
  async createCard(createCardDto: CreateCardDto) {
    const { listId, name, description } = createCardDto;
    const newCard = await this.cardRepository.save({
      list_id: listId,
      name,
      description,
    });
    return newCard;
  }

  // 카드 리스트 조회
  async getCardList(getCardListDto: GetCardListDto): Promise<Card[]> {
    const { listId: list_id, assignment_id, collaboratior_id } = getCardListDto;

    const card = await this.cardRepository.find({ where: { list_id } });

    const cards = card.map((card) => ({
      ...card,
      assignorId: assignment_id,
      assigneeId: collaboratior_id,
    }));

    return cards;
  }

  // 카드 상세조회
  async getCardDetail(cardId: number, assignment_id: number, collaborator_id: number) {
    const card = await this.cardRepository.findOne({ where: { id: cardId } });

    return {
      card,
      assignorId: assignment_id,
      assigneeId: collaborator_id,
    };
  }

  // 카드 수정
  async updateCard(cardId: number, updateCardDto: UpdateCardDto) {
    const { name, description, color, assignment_id, collaborator_id } = updateCardDto;

    // 수정할 카드 아이디를 찾습니다.
    const card = await this.cardRepository.findOne({ where: { id: cardId } });

    if (!card) {
      throw new NotFoundException(`카드를 찾을 수 없습니다.`);
    }

    // 댓글을 수정합니다.
    const updateCard = await this.cardRepository.save({
      id: cardId,
      name,
      description,
      color,
      assignment_id,
      collaborator_id,
    });

    return updateCard;
  }

  async deleteCard(cardId: number) {
    const card = await this.cardRepository.findOne({ where: { id: cardId } });

    if (!card) {
      throw new NotFoundException(`카드를 찾을 수 없습니다.`);
    }

    // 카드를 삭제합니다
    await this.cardRepository.delete(cardId);
  }
}
