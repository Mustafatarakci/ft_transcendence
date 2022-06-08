import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const ret = await this.userService.getUser(id);
    return ret;
  }

  @Post(':name')
  async createUser(@Param('name') name: string) {
    await this.userService.createUser(name);
    return 'create user';
  }
}
