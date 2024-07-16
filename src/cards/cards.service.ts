import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { User } from 'src/users/entities/user.entity';
import { CARDMESSAGE } from 'src/constants/card-message.constant';
import { MoveCardDto } from './dto/move-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>
  ) {}

  // 카드 생성
  async createCard(createCardDto: CreateCardDto, user: User) {
    const { listId, title, description } = createCardDto;
    const newCard = await this.cardRepository.save({
      user: { id: user.id },
      list: { id: listId },
      title,
      description,
    });

    // position이 카드 테이블에 데이터가 아무것도 없으면 1024, 있으면 그중에 제일 큰 값에다가 +1024가 되어야한다.

    return newCard;
  }

  // // 카드 리스트 조회
  async getCardList(): Promise<any[]> {
    const cards = await this.cardRepository.find();

    // 각 카드에 추가 정보 할당
    const updatedCards = cards.map((card) => ({
      cardId: card.id,
      listId: card.listId,
      title: card.title,
      createdAt: card.created_at,
      updatedAt: card.updated_at,
    }));

    return updatedCards;
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
      throw new NotFoundException(CARDMESSAGE.COMMON.NOTFOUND.CARD);
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
      throw new NotFoundException(CARDMESSAGE.COMMON.NOTFOUND.CARD);
    }
    await this.cardRepository.delete(cardId);
  }

  async moveCard(cardId: number, moveCardDto: MoveCardDto) {
    const id = cardId;
    let { prevElIndexNumber, nextElIndexNumber, position } = moveCardDto;

    if (prevElIndexNumber === undefined) {
      position = nextElIndexNumber - 512;
    } else if (nextElIndexNumber === undefined) {
      position = prevElIndexNumber + 512;
    } else {
      position = Math.floor((prevElIndexNumber + nextElIndexNumber) / 2);
    }

    // 카드 위치 업데이트

    if (
      Math.abs(position - prevElIndexNumber) <= 1 ||
      Math.abs(position - nextElIndexNumber) <= 1
    ) {
      await this.cardRepository
        .createQueryBuilder()
        .update(Card)
        .set({ position })
        .where({ id: cardId })
        .execute();

      const cards = await this.cardRepository
        .createQueryBuilder('card')
        .orderBy('card.position', 'ASC')
        .getMany();

      // 모든 카드의 위치를 새로 계산하여 업데이트
      await Promise.all(
        cards.map(async (card, index) => {
          await this.cardRepository
            .createQueryBuilder()
            .update(card)
            .set({ position: (index + 1) * 1024 })
            .where({ id: cardId })
            .execute();
        })
      );

      return cards;

      await this.cardRepository.save(cards);
    }
  }
}
