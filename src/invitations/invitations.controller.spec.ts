import { Test, TestingModule } from '@nestjs/testing';
import { InvitationsController } from './invitations.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Board } from 'src/boards/entities/board.entity';
import { InvitationsService } from './invitations.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './meilers/email.service';
import { Invitation } from './entities/invitation.entity';
import { Member } from './entities/member.entity';

describe('InvitationsController', () => {
  let controller: InvitationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitationsController],
      providers: [
        InvitationsService,
        UsersService,
        EmailService,
        ConfigService,
        { provide: getRepositoryToken(Board), useValue: {} },
        { provide: getRepositoryToken(Invitation), useValue: {} },
        { provide: getRepositoryToken(Member), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile();

    controller = module.get<InvitationsController>(InvitationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
