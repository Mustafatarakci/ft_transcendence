import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Nickname, UserProfileDto } from './dto/users.dto';
import { GameRecordDto } from './dto/gameRecord.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'kankim✅ 모든 유저 닉네임 가져오기' })
  @Get('')
  async getUsers(): Promise<Nickname[]> {
    const nicknames = await this.usersService.getUsers();

    return nicknames;
  }

  @ApiOperation({ summary: 'kankim✅ 특정 유저의 프로필 조회' })
  @Get(':id')
  async getUserProfile(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserProfileDto> {
    const userProfile = await this.usersService.getUserProfile(id);

    return userProfile;
  }

  @ApiOperation({ summary: 'kankim✅ 친구 추가' })
  @Post(':id/friends')
  async addFriend(
    @Param('id', ParseIntPipe) myId: number,
    @Body('targetId', ParseIntPipe) targetId: number,
  ): Promise<void> {
    await this.usersService.addFriend(myId, targetId);
  }

  @ApiOperation({ summary: 'kankim✅ 친구 목록( 닉네임 ) 조회' })
  @Get(':id/friends')
  async getFriends(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<Nickname[]> {
    return await this.usersService.getFriends(userId);
  }

  @ApiOperation({ summary: 'kankim✅ 전적 조회' })
  @Get(':id/gameRecords')
  async getGameRecords(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<GameRecordDto[]> {
    const gameRecords = this.usersService.getGameRecords(userId);

    return gameRecords;
  }
}
