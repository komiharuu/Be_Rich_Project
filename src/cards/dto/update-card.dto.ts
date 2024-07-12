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
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '내용을 입력해주세요.' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: '배경 색상을 입력해주세요.' })
  color: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: '위치를 입력해주세요.' })
  position: number;

  @Type(() => Number)
  @IsNotEmpty({ message: '할당자 id를 입력해주세요.' })
  assignment_id: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: '할당 받을 사람들의 id를 입력해주세요.' })
  collaborator_id: number[];

  @IsNotEmpty({ message: '시작일을 입력해주세요.' })
  startdate: Date;

  @IsNotEmpty({ message: '마감일을 입력해주세요.' })
  duedate: Date;

  @IsString()
  @IsNotEmpty({ message: '체크리스트 제목을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '체크리스트 내용을 입력해주세요.' })
  item: string[];

  @IsBoolean()
  is_completed: boolean;

  // 수정 시 트랜잭션으로 체크리스트랑 카드 동시작업예정이기 때문에 하나의 dto로 묶음.
  // 사유: 카드 안에 체크리스트 설정하는 것이 동시에 있기 때문.
}
