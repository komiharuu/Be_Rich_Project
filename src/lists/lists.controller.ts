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
  constructor(private readonly listsService: ListService) {}

  @Post()
  async createList(@Body() createListDto: CreateListDto, @Req() req: any): Promise<List> {
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
  async deleteList(@Param('id') id: number): Promise<{ message: string }> {
    return this.listsService.deleteList(id);
  }

  @Patch(':id/move')
  async updatePosition(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateListPositionDto: UpdateListPositionDto
  ): Promise<List> {
    return this.listsService.updatePosition(id, updateListPositionDto);
  }
}
