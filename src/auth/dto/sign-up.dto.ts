import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AUTH_MESSAGE_CONSTANT } from 'src/constants/Auth/auth-message.constant';
import { User } from 'src/users/entities/user.entity';

export class SignUpDto extends PickType(User, ['email', 'password', 'nickname']) {
  @IsString()
  @IsNotEmpty({ message: AUTH_MESSAGE_CONSTANT.SIGN_UP.PASSWORD_CHECK.IS_NOT_EMPTY })
  passwordCheck: string;
}
