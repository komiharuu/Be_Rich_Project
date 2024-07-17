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

export class UpdateCardDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  color: string;

  startDate: Date;

  dueDate: Date;
}
