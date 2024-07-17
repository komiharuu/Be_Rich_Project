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
<<<<<<< HEAD
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

=======
>>>>>>> b6b5f30278a86476908734afbfb6e8685fccef98
  constructor(private readonly listsService: ListService) {}

  @Post()
  async createList(@Body() createListDto: CreateListDto, @Req() req: any ): Promise<List> {
    const userId = req.user.userId;
    return this.listsService.createList(createListDto, userId);
  }

  @Get()
  async getLists(): Promise<List[]> {
    return this.listsService.getLists();
  }

  @Patch(':id')
  async updateList(@Param('id') id: number, @Body() updateListDto: UpdateListDto): Promise<List> {
    return this.listsService.updateList(id, updateListDto);
  }

  @Delete(':id')
<<<<<<< HEAD
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.listsService.delete(id);
=======
  async deleteList(@Param('id') id: number): Promise< {message:string} > {
    return this.listsService.deleteList(id);
>>>>>>> b6b5f30278a86476908734afbfb6e8685fccef98
  }

  @Patch(':id/move')
  async updatePosition(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateListPositionDto: UpdateListPositionDto
  ): Promise<List> {
    return this.listsService.updatePosition(id, updateListPositionDto);
  }
}
