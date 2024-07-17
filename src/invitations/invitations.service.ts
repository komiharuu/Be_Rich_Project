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
import { Status } from 'src/boards/types/invitation-status.type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation) private invitationRepository: Repository<Invitation>,
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService
  ) {}

  // 보드 존재 여부 확인
  private async findBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['user', 'members'],
    });
    if (!board) {
      throw new NotFoundException('존재하지 않는 보드입니다.');
    }
    return board;
  }

  // 이미 보드 멤버인지 확인
  private async isExistingMember(boardId: number, userId: number): Promise<boolean> {
    const existingMember = await this.memberRepository.findOne({
      where: { board: { id: boardId }, user: { id: userId } },
    });
    return !!existingMember;
  }

  //토큰 발급
  private async generateUniqueToken(): Promise<string> {
    let token: string;
    let tokenExists;
    do {
      token = uuid4();
      tokenExists = await this.invitationRepository.findOne({ where: { token } });
    } while (tokenExists);
    return token;
  }

  /* 보드 초대 */
  async createInvitation(id: number, inviteDto: { memberEmail: string }, user: User) {
    const board = await this.findBoardById(id);

    if (await this.isExistingMember(board.id, user.id)) {
      throw new ConflictException('해당 사용자는 이미 보드 멤버입니다.');
    }

    //사용자 정보 가져오기
    const invitedUser = await this.usersService.getUserByEmail(inviteDto.memberEmail);

    if (!invitedUser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 기존 초대 확인
    let invitation = await this.invitationRepository.findOne({
      where: {
        board: { id: board.id },
        memberEmail: inviteDto.memberEmail,
        status: Status.Pending,
      },
    });

    // 초대가 없는 경우 새로운 초대 생성
    if (!invitation) {
      // 인증 토큰 생성
      const token = await this.generateUniqueToken();

      invitation = this.invitationRepository.create({
        board,
        memberEmail: inviteDto.memberEmail,
        token,
        status: Status.Pending,
        createdAt: new Date(),
      });

      await this.invitationRepository.save(invitation);
    }

    // 이메일 전송
    await this.emailService.sendEmail(
      inviteDto.memberEmail,
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
            <a href="http://localhost:3000/accept-invitation?token=${invitation.token}">초대 수락하기</a>
        </body>
        </html>
      `
    );

    return {
      status: HttpStatus.OK,
      message: '성공적으로 초대 메일을 전송하였습니다.',
    };
  }

  /* 보드 초대 수락 */
  async acceptInvitation(token: string, user: User) {
    // 초대 토큰 확인
    const invitation = await this.invitationRepository.findOne({
      where: { token },
      relations: ['board'],
    });

    if (!invitation) {
      throw new NotFoundException('유효하지 않은 초대 토큰입니다.');
    }

    const board = invitation.board;

    if (await this.isExistingMember(board.id, user.id)) {
      throw new ConflictException('해당 사용자는 이미 보드 멤버입니다.');
    }

    // 사용자를 보드 멤버로 추가
    const newMember = this.memberRepository.create({
      board,
      user,
      role: Role.Member,
      invitationId: invitation.id,
      createdAt: new Date(),
    });
    await this.memberRepository.save(newMember);

    // 초대 정보 상태 업데이트
    invitation.status = Status.Accepted;
    await this.invitationRepository.save(invitation);

    return {
      status: HttpStatus.CREATED,
      message: '성공적으로 보드에 가입되었습니다.',
    };
  }
}
