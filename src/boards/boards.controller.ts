import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { BoardMemberGuard } from './board-member.guard';
import { BoardOwnerGuard } from './board-owner.guard';

@ApiTags('보드')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  /**
   * 보드 생성
   * */
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto, @Req() req: { user: User }) {
    const user = req.user;
    return await this.boardsService.createBoard(createBoardDto, user.id);
  }

  /**
   * 보드 목록 조회
   */
  @UseGuards(AuthGuard('jwt'), BoardMemberGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  getBoardList(@Req() req: { user: User }) {
    const user = req.user;
    return this.boardsService.getBoardList(user);
  }

  /**
   * 보드 상세 조회
   */
  @UseGuards(AuthGuard('jwt'), BoardMemberGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':boardId')
  getBoardDetail(@Param('boardId') id: number, @Req() req: { user: User }) {
    const user = req.user;
    return this.boardsService.getBoardDetail(+id, user);
  }

  /**
   * 보드 수정
   */
  @UseGuards(AuthGuard('jwt'), BoardOwnerGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':boardId')
  updateBoard(
    @Param('boardId') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @Req() req: { user: User }
  ) {
    const user = req.user;
    return this.boardsService.updateBoard(+id, updateBoardDto, user);
  }

  /**
   * 보드 삭제
   */
  @UseGuards(AuthGuard('jwt'), BoardOwnerGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':boardId')
  deleteBoard(@Param('boardId') id: number, @Req() req: { user: User }) {
    const user = req.user;
    return this.boardsService.deleteBoard(+id, user);
  }
}
