import { Controller, Get, Patch, Delete, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('my')
  async getUserInfo(@Req() req: Request & { user: User }) {
    const userId = req.user.id;
    return this.usersService.findOne(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('my')
  async updateUser(@Req() req: Request & { user: User }, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.id;
    return this.usersService.update(userId, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('my')
  async deleteUser(@Req() req: Request & { user: User }) {
    const userId = req.user.id;
    return this.usersService.remove(userId);
  }
}
