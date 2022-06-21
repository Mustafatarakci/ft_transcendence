import {
  Controller,
  Get,
  Body,
  Post,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { EmailService } from 'src/emails/email.service';
import { EmailDto, UserProfileDto } from './dto/users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Get('/email')
  async secondAuth(@Query('email') email: string): Promise<boolean> {
    const user = await this.usersService.getUserByEmail(email);
    if (user === null) {
      return false;
    }
    await this.emailService.sendEmail(user.email, user.secondAuthCode);
    // await this.emailService.sendEmail('dudns0503@naver.com');
    return true;
  }

  @Post('/emailVerify')
  async checkVerity(
    @Query('email') email: string,
    @Body('code') code: number,
  ): Promise<boolean> {
    const user = await this.usersService.getUserByEmail(email);
    return user.secondAuthCode === code;
  }

  @Post('/emailAuthSetup')
  async codeSetup(@Body() emailDto: EmailDto): Promise<void> {
    this.usersService.toggleSecondAuth(emailDto.email);
  }

  @ApiOperation({ summary: '유저 목록 가져오기' })
  @Get('')
  async getUsers(): Promise<User[]> {
    const ret = await this.usersService.getUsers();
    return ret;
  }

  @ApiOperation({ summary: '특정 유저의 정보 조회' })
  @Get(':id')
  async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserProfileDto> {
    const user = await this.usersService.getUserById(id);

    return user;
  }
}
