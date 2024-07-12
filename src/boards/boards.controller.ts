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
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('보드')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  //가드 추가 필요
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardsService.createBoard(createBoardDto);
  }

  @Get()
  getBoardList() {
    return this.boardsService.getBoardList();
  }

  @Get(':boardId')
  getBoardDetail(@Param('boardId') id: string) {
    return this.boardsService.getBoardDetail(+id);
  }

  @Patch(':boardId')
  updateBoard(@Param('boardId') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.updateBoard(+id, updateBoardDto);
  }

  @Delete(':boardId')
  deleteBoard(@Param('boardId') id: string) {
    return this.boardsService.deleteBoard(+id);
  }
}
