import { ListService } from './lists.service';
import { UpdateListDto } from './dto/update-list.dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Patch,
  Delete,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';
import { UpdateListPositionDto } from './dto/update-list.position.dto';
import { BoardMemberGuard } from 'src/boards/guards/board-member.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('lists')
export class ListsController {
  deleteList(req: { params: { listId: number }; user: { id: number } }, listId: number) {
    throw new Error('Method not implemented.');
  }
  updateList(
    req: { params: { listId: number }; user: { id: number } },
    listId: number,
    updateListDto: { title: string }
  ) {
    throw new Error('Method not implemented.');
  }
  createList(req: { user: { id: number } }, createListDto: { boardId: number; title: string }) {
    throw new Error('Method not implemented.');
  }
  getLists(req: { user: { id: number } }, getListsDto: { board: number }) {
    throw new Error('Method not implemented.');
  }

  constructor(private readonly listsService: ListService) {}

  @Post()
  async create(@Body() createListDto: CreateListDto, @Req() req): Promise<List> {
    const userId = req.user.userId;
    return this.listsService.create(createListDto, userId);
  }

  @Get()
  async findAll(): Promise<List[]> {
    return this.listsService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateListDto: UpdateListDto): Promise<List> {
    return this.listsService.update(id, updateListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.listsService.delete(id);
  }

  @Patch(':id/move')
  async updatePosition(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateListPositionDto: UpdateListPositionDto
  ): Promise<List> {
    return this.listsService.updatePosition(id, updateListPositionDto);
  }
}
