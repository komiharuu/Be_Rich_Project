import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuid4 } from 'uuid';
import { EmailService } from 'src/boards/meilers/email.service';
import { Invitation } from 'src/boards/entities/invitation.entity';
import { Role } from 'src/boards/types/member-role.type';
import { Member } from 'src/boards/entities/member.entity';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation) private invitationRepository: Repository<Invitation>,
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    private readonly emailService: EmailService
  ) {}

  //보드 존재 여부 확인
  private async findBoardByIdAndUser(id: number, user: User): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id, user },
      relations: ['members'],
    });
    if (!board) {
      throw new NotFoundException('존재하지 않는 보드입니다.');
    }
    return board;
  }

  /* 보드 초대 */
  async createInvitation(id: number, inviteDto, user: User) {
    const board = await this.findBoardByIdAndUser(id, user);

    //이미 보드 멤버인지 확인
    const existingMember = await this.memberRepository.findOne({
      where: { board, user: inviteDto.email },
    });

    if (existingMember) {
      throw new ConflictException('해당 사용자는 이미 보드 멤버입니다.');
    }

    //인증 토큰 생성
    const token = uuid4();

    //초대 정보를 데이터베이스에 저장
    await this.invitationRepository.save({
      boardId: board.id,
      ownerId: board.user.id,
      token,
      createdAt: new Date(),
    });

    //이메일 전송
    await this.emailService.sendEmail(
      inviteDto.email,
      '트렐로 서비스 초대 발송',
      `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Board Invitation</title>
        </head>
        <body>
            <p>안녕하세요, ${board.title}에 초대받으셨습니다.</p>
            <p>${board.user.nickname}님께서 보낸 초대 이메일입니다.</p>
            <p>아래 링크를 클릭하여 보드에 가입하세요.</p>
            <a href="http://localhost:3000/accept-invitation?token=${token}">초대 수락하기</a>
        </body>
        </html>
      `
    );

    return {
      status: HttpStatus.OK,
    };
  }

  /* 보드 초대 수락 */
  async acceptInvitation(token: string, user: User) {
    //초대 토큰 확인
    const invitation = await this.invitationRepository.findOne({ where: { token } });

    if (!invitation) {
      throw new NotFoundException('유효하지 않은 초대 토큰입니다.');
    }

    const board = await this.findBoardByIdAndUser(invitation.board.id, user);

    //이미 보드 멤버인지 확인
    const existingMember = await this.memberRepository.findOne({
      where: { board, user },
    });

    if (existingMember) {
      throw new ConflictException('해당 사용자는 이미 보드 멤버입니다.');
    }

    // 사용자를 보드 멤버로 추가
    const newMember = this.memberRepository.create({
      board,
      user,
      invitation,
      role: Role.Member,
      createdAt: new Date(),
    });
    await this.memberRepository.save(newMember);

    //초대 정보 삭제
    await this.invitationRepository.delete({ token });

    return {
      status: HttpStatus.CREATED,
      message: '성공적으로 보드에 가입되었습니다.',
    };
  }
}
