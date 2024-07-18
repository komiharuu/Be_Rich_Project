import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from 'src/boards/boards.module';
import { Board } from 'src/boards/entities/board.entity';
import { Invitation } from './entities/invitation.entity';
import { Member } from 'src/invitations/entities/member.entity';
import { EmailService } from 'src/invitations/meilers/email.service';
import { InvitationsController } from 'src/invitations/invitations.controller';
import { InvitationsService } from 'src/invitations/invitations.service';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation, Board, User, Member]),
    CacheModule.register(),
    UsersModule,
    BoardsModule,
  ],
  providers: [InvitationsService, EmailService],
  controllers: [InvitationsController],
  exports: [TypeOrmModule],
})
export class InvitationsModule {}
