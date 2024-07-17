import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CARDMESSAGE } from 'src/constants/card-message.constant';

export class CreateCardDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: CARDMESSAGE.COMMON.LISTID.REQUIRED })
  list_id: number;

  @IsString()
  @IsNotEmpty({ message: CARDMESSAGE.COMMON.NAME.REQUIRED })
  title: string;

  @IsString()
  @IsNotEmpty({ message: CARDMESSAGE.COMMON.DESCRIPTION.REQUIRED })
  description: string;

  position: number;

  // @Type(() => Number)
  // @IsNumber()
  // @IsNotEmpty({ message: '위치를 입력해주세요.' })
  // position: number;

  // @Type(() => Number)
  // @IsNumber()
  // @IsNotEmpty({ message: '할당자 id를 입력해주세요.' })
  // assignment_id: number;

  // @IsNotEmpty({ message: '마감일을 입력해주세요.' })
  // duedate: Date;
}
