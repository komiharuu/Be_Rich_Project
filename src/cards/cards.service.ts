import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { User } from 'src/users/entities/user.entity';
import { CARDMESSAGE } from 'src/constants/card-message.constant';
import { MoveCardDto } from './dto/move-card.dto';
import { AssignCardDto } from './dto/assign-card.dto';
import { List } from 'src/lists/entities/list.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(List)
    private listRepository: Repository<List>
  ) {}

  // 카드 생성
  async createCard(createCardDto: CreateCardDto, user: User) {
    const { listId, title, description } = createCardDto;
    const cards = await this.cardRepository.find({ order: { position: 'ASC' } });

    // 리스트를 조회합니다.
    const list = await this.listRepository.findOne({ where: { id: listId } });
    if (!list) {
      throw new NotFoundException(CARDMESSAGE.COMMON.NOTFOUND.LIST);
    }

    let newPosition: number;

    if (cards.length === 0) {
      newPosition = 1024;
    } else {
      const maxPosition = cards[cards.length - 1].position;

      newPosition = maxPosition + 1024;
    }

    const newCard = this.cardRepository.create({
      user: { id: user.id },
      list: { id: listId },
      title,
      position: newPosition,
      description,
    });

    await this.cardRepository.save(newCard);

    return newCard;
  }

  // 카드 상세조회 - 상세조회한 카드에 댓글도 같이 보이게 함
  async getCardDetail(cardId: number) {
    const card = await this.cardRepository.findOne({
      where: { id: cardId },
      relations: ['comments'],
    });

    return {
      card,
    };
  }

  // 카드 수정
  async updateCard(cardId: number, updateCardDto: UpdateCardDto) {
    const { title, description, color, startDate, dueDate } = updateCardDto;

    // 수정할 카드 아이디를 찾습니다.
    const card = await this.cardRepository.findOne({ where: { id: cardId } });

    if (!card) {
      throw new NotFoundException(CARDMESSAGE.COMMON.NOTFOUND.CARD);
    }

    // 댓글을 수정합니다.
    const updateCard = await this.cardRepository.save({
      id: cardId,
      title,
      description,
      color,
      startDate,
      dueDate,
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

  // 끝의부분 수정 및 포지션 변경안됨 - id를 통한 이동
  async moveCard(moveCardDto: MoveCardDto, cardId: number): Promise<Card> {
    const { prePositionNumber, nextPositionNumber } = moveCardDto;

    let newPosition: number;

    // changePositionNumber가 1일 경우, 첫 번째 카드의 위치를 절반으로 나눈 값으로 newPosition을 설정합니다.

    if (prePositionNumber === undefined) {
      newPosition = nextPositionNumber - 512;
      // 드래그된 요소가 가장 상단에 있는 경우
    } else if (nextPositionNumber === undefined) {
      newPosition = prePositionNumber + 512;
      // 드래그된 요소가 가장 하단에 있는 경우
    } else {
      newPosition = Math.floor((prePositionNumber + nextPositionNumber) / 2);
    }

    const card = await this.cardRepository.findOne({ where: { id: cardId } });

    if (!card) {
      throw new NotFoundException(CARDMESSAGE.COMMON.NOTFOUND.CARD);
    }
    card.position = newPosition;

    await this.cardRepository.save(card);
    if (
      (prePositionNumber !== undefined && Math.abs(newPosition - prePositionNumber) <= 1) ||
      (nextPositionNumber !== undefined && Math.abs(newPosition - nextPositionNumber) <= 1)
    ) {
      const cards = await this.cardRepository.find({
        order: { position: 'ASC' },
      });

      // 모든 카드들에 대해 순차적으로 위치를 재설정합니다.
      for (let i = 0; i < cards.length; i++) {
        cards[i].position = (i + 1) * 1024;
        await this.cardRepository.save(cards[i]);
      }
    }

    return card;
  }

  // 작업자 할당
  async assignCard(cardId: number, assignCardDto: AssignCardDto) {
    const { assignorId, assigneeId } = assignCardDto;

    // 수정할 카드 아이디를 찾습니다.
    const card = await this.cardRepository.findOne({ where: { id: cardId } });

    if (!card) {
      throw new NotFoundException(CARDMESSAGE.COMMON.NOTFOUND.CARD);
    }

    // assignorId, assigneeId는 user정보에 있어야하고, 확인 절차에 들어갑니다
    const assignor = await this.userRepository.findOne({ where: { id: assignorId } });
    const assignee = await this.userRepository.findOne({ where: { id: assigneeId } });

    if (!assignor || !assignee) {
      throw new NotFoundException(CARDMESSAGE.COMMON.NOTFOUND.USER);
    }

    card.assignorId = assignorId;
    card.assigneeId = assigneeId;

    const assignCard = await this.cardRepository.save(card);

    return {
      assignorId: card.assignorId,
      assigneeId: card.assigneeId,
      cardId: card.id,
    };
  }
}
