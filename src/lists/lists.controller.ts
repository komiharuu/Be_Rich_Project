import { ListService } from './lists.service';
import { UpdateListDto } from './dto/update-list.dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
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

@UseGuards(AuthGuard('jwt'), BoardMemberGuard)
@Controller('/board/:boardId/lists')
export class ListsController {
  constructor(private readonly listsService: ListService) {}

  @Post()
  async createList(@Param('boardId', ParseIntPipe) boardId: number, @Body() createListDto: CreateListDto, @Req() req:any) 
  : Promise<any> {
    const userId = req.user.id;
    return this.listsService.createList(createListDto, boardId, userId);
  }

  @Get()
  async getLists(@Param('boardId', ParseIntPipe) boardId: number): Promise<any[]> {
    return this.listsService.getLists(boardId);
  }

  @Patch(':listId')
  async updateList(@Param('listId') id: number, @Body() updateListDto: UpdateListDto): Promise<List> {
    return this.listsService.updateList(id, updateListDto);
  }

  @Delete(':listId')
  async deleteList(@Param('listId') id: number): Promise< {message:string} > {
    return this.listsService.deleteList(id);
  }

  @Patch(':listId/move')
  async updatePosition(
    @Param('listId', ParseIntPipe) id: number,
    @Body() updateListPositionDto: UpdateListPositionDto
  ): Promise<List> {
    return this.listsService.updatePosition(id, updateListPositionDto);
  }
}
