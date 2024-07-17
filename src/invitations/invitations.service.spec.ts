import { Test, TestingModule } from '@nestjs/testing';
import { InvitationsService } from './invitations.service';
import { Invitation } from 'src/boards/entities/invitation.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Board } from 'src/boards/entities/board.entity';
import { Member } from 'src/boards/entities/member.entity';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/boards/meilers/email.service';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

describe('InvitationsService', () => {
  let service: InvitationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvitationsService,
        UsersService,
        EmailService,
        ConfigService,
        { provide: getRepositoryToken(Invitation), useValue: {} },
        { provide: getRepositoryToken(Board), useValue: {} },
        { provide: getRepositoryToken(Member), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile();

    service = module.get<InvitationsService>(InvitationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
