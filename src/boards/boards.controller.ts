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

@ApiTags('보드')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto, @Req() req) {
    const userId = req.user.id;
    return await this.boardsService.createBoard(createBoardDto, userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getBoardList() {
    return this.boardsService.getBoardList();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':boardId')
  getBoardDetail(@Param('boardId') id: number) {
    return this.boardsService.getBoardDetail(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':boardId')
  updateBoard(@Param('boardId') id: number, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.updateBoard(+id, updateBoardDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':boardId')
  deleteBoard(@Param('boardId') id: number) {
    return this.boardsService.deleteBoard(+id);
  }
}
