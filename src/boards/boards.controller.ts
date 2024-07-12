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

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  //가드 추가 필요
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardsService.createBoard(createBoardDto);
  }

  @Get()
  getAll() {
    return this.boardsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.boardsService.getOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.boardsService.delete(+id);
  }
}
