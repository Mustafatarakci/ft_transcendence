import { Body, Controller, Get, Post, Query, Redirect } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { AuthService } from './auth.service';
import { IsSignedUpDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '42 oauth page 로 redirection' })
  @Get('oauthPage')
  @Redirect(
    'https://api.intra.42.fr/oauth/authorize?client_id=c44164aba01e6b4652fb6a4107e5188020a7e0c823b5013b2879b85ef7ea9abb&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code',
  )
  async getOatuhPage() {
    return 'getOauthPage';
  }

  @ApiOperation({
    summary: '유저의 회원가입 여부 확인',
  })
  @Post('isSignedUp')
  async isSignedUp(@Query('code') code: string): Promise<IsSignedUpDto> {
    const isSignedUpDto = await this.authService.isSignedUp(code);

    return isSignedUpDto;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: '닉네임 중복 확인' })
  @Post('isDuplicateNickname')
  async isDuplicateNickname(@Query() nickname: string): Promise<boolean> {
    return await this.authService.isDuplicateNickname(nickname);
  }

  @ApiOperation({ summary: 'todo: 이미지 업로드' })
  @Post('uploadImage')
  async uploadImage() {
    return 'todo: 이미지 업로드';
  }
}
