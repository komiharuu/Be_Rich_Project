import { IsNotEmpty, IsString } from 'class-validator';

export class GetCardListDto {
  title: string;

  description: string;
  list_id: number;

  assignment_id: number;
  collaboratior_id: number;
}
