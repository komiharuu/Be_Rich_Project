import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateInvitationDto {
  @IsNotEmpty({ message: '초대할 사용자의 이메일을 입력해 주세요.' })
  @IsEmail()
  memberEmail: string;
}
