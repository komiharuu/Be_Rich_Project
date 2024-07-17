import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { BoardOwnerGuard } from 'src/boards/guards/board-owner.guard';
import { CreateInvitationDto } from 'src/boards/dto/create-invitation.dto';
import { User } from 'src/users/entities/user.entity';
import { InvitationsService } from './invitations.service';

@ApiTags('보드')
@Controller('boards')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}
  /**
   * 보드 초대
   */
  @UseGuards(AuthGuard('jwt'), BoardOwnerGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(':boardId/invite')
  createInvitation(
    @Param('boardId') id: number,
    @Body() inviteDto: CreateInvitationDto,
    @Req() req: any
  ) {
    const user: User = req.user;
    return this.invitationsService.createInvitation(+id, inviteDto, user);
  }

  /**
   * 보드 초대 수락
   */
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Get(':boardId/accept-invitation')
  acceptInvitation(@Query('token') token: string, @Req() req: any) {
    const user: User = req.user;
    return this.invitationsService.acceptInvitation(token, user);
  }

  /**
   * 보드 초대 거절
   */
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Get(':boardId/decline-invitation')
  declineInvitation(@Query('token') token: string, @Req() req: any) {
    const user: User = req.user;
    return this.invitationsService.declineInvitation(token, user);
  }
}
