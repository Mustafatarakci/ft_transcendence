import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';
import { UsersService as UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const ret = await this.userService.getUserById(id);
    return ret;
  }
}
