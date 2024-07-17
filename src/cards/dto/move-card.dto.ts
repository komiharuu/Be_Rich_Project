import { IsNotEmpty } from 'class-validator';

export class MoveCardDto {
  prePositionNumber: number;

  nextPositionNumber: number;
}
