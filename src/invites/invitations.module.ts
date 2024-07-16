import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { EmailModule } from 'src/boards/meilers/email.module';
import { EmailService } from 'src/boards/meilers/email.service';
import { UsersService } from 'src/users/users.service';
import { BoardsService } from 'src/boards/boards.service';
import { BoardsModule } from 'src/boards/boards.module';
import { Invitation } from 'src/boards/entities/invitation.entity';
import { Member } from 'src/boards/entities/member.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation, Board, User, Member]),
    CacheModule.register(),
    BoardsModule,
    UsersModule,
    EmailModule,
  ],
  providers: [InvitationsService, BoardsService, EmailService, UsersService],
  controllers: [InvitationsController],
})
export class InvitationsModule {}
