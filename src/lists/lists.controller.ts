import { ListService } from './lists.service';
import { UpdateListDto } from './dto/update-list.dto';
import { Body, Controller, Post, UseGuards, Request, Get, Param, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';


@Controller('lists')
export class ListsController {
  deleteList(listId: number) {
    throw new Error('Method not implemented.');
  }
  updateList(listId: number, updateListDto: { title: string; }) {
    throw new Error('Method not implemented.');
  }
  getLists() {
    throw new Error('Method not implemented.');
  }
  createList(createListDto: { title: string; }) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly listsService: ListService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createListDto: CreateListDto, @Request() req): Promise<List> {
    const userId = req.user.userId;
    return this.listsService.create(createListDto, userId);
  }
  @Get()
  findAll() {
    return this.listsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listsService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listsService.remove(+id);
  }
}
