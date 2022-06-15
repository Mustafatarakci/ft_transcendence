import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';
import { UsersService as UsersService } from './users.service';
import { EmailService } from 'src/emails/email.service';
import { CreateUserDto } from './dto/users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly emailService: EmailService) {}

  @Get('/email')
  async secondAuth() {
    await this.emailService.sendEmail('dudns0503@naver.com');
    return 'email';
  }

  @Post('/emailVerify')
  async checkVerity(@Body('code') code: number) : Promise<boolean> {
    return await this.emailService.emailVerify(code);
  }

  @Post('/emailAuthSetup')
  async codeSetup(createUserDto: CreateUserDto) {
    if (!createUserDto.secondAuth)
    {
      console.log('이메일 2차 인증 설정');
      createUserDto.secondAuth = true;
    }
    else
    {
      console.log('이메일 2차 인증 설정 해제');
      createUserDto.secondAuth = false;
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const ret = await this.userService.getUserById(id);
    return ret;
  }
}
