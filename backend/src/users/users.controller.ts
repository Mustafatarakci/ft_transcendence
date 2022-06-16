import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';
import { UsersService as UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: '유저 목록 가져오기' })
  @Get('')
  async getUsers(): Promise<User[]> {
    const ret = await this.userService.getUsers();
    return ret;
  }
}
