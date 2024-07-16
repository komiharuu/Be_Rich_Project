import { Body, Controller, Delete, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('users/my')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 사용자 프로필 조회
  @Get()
  async getUserProfile(@Req() req: any) {
    return await this.usersService.getUserProfile(req.user.id);
  }

  // 사용자 프로필 수정
  @Patch()
  async updateUserProfile(@Body() updateUserProfileDto: UpdateUserProfileDto, @Req() req: any) {
    return await this.usersService.updateUserProfile(updateUserProfileDto, req.user.id);
  }

  // 사용자 프로필 삭제 (회원 탈퇴)
  @Delete()
  async deleteUserProfile(@Req() req: any) {
    return await this.usersService.deleteUserProfile(req.user.id);
  }
}
