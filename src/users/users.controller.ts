import { Controller, Get, Patch, Delete, Body, Req, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  async getUserInfo(@Req() req: Request & { user: User }) {
    try {
      const userId = req.user.id;
      const user = await this.usersService.findOne(userId);
      return this.formatUserResponse(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('사용자 정보를 찾을 수 없습니다.');
      } else {
        throw new BadRequestException('사용자 정보를 가져오는 중에 문제가 발생했습니다.');
      }
    }
  }

  @UseGuards(AuthGuard)
  @Patch('my')
  async updateUser(@Req() req: Request & { user: User }, @Body() updateUserDto: UpdateUserDto) {
    try {
      const userId = req.user.id;
      const updatedUser = await this.usersService.update(userId, updateUserDto);
      return this.formatUserResponse(updatedUser);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('사용자 정보를 찾을 수 없습니다.');
      } else {
        throw new BadRequestException('사용자 정보를 업데이트하는 중에 문제가 발생했습니다.');
      }
    }
  }

  @UseGuards(AuthGuard)
  @Delete('my')
  async deleteUser(@Req() req: Request & { user: User }) {
    try {
      const userId = req.user.id;
      await this.usersService.remove(userId);
      return { message: '사용자 정보가 성공적으로 삭제되었습니다.' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('사용자 정보를 찾을 수 없습니다.');
      } else {
        throw new BadRequestException('사용자 정보를 삭제하는 중에 문제가 발생했습니다.');
      }
    }
  }

  private formatUserResponse(user: User) {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,
      point: user.point,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
