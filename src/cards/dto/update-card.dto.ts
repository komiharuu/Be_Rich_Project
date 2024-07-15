import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import {
  IS_NUMBER_STRING,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  color: string;

  @Type(() => Number)
  assignment_id: number;

  @Type(() => Number)
  @IsNumber()
  collaborator_id: number[];

  startdate: Date;

  duedate: Date;
}
