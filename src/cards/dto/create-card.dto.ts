import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CARDMESSAGE } from 'src/constants/card-message.constant';

export class CreateCardDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: CARDMESSAGE.COMMON.LISTID.REQUIRED })
  listId: number;

  @IsString()
  @IsNotEmpty({ message: CARDMESSAGE.COMMON.NAME.REQUIRED })
  title: string;

  @IsString()
  @IsNotEmpty({ message: CARDMESSAGE.COMMON.DESCRIPTION.REQUIRED })
  description: string;
}
