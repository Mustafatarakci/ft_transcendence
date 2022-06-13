import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { SignInResultDto } from 'src/users/dto/users.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('oauthPage')
  @Redirect(
    'https://api.intra.42.fr/oauth/authorize?client_id=c44164aba01e6b4652fb6a4107e5188020a7e0c823b5013b2879b85ef7ea9abb&redirect_uri=http://localhost:3000/auth/signIn&response_type=code',
  )
  async getOatuhPage() {
    return 'getOauthPage';
  }

  @Get('signIn')
  async signIn(@Query('code') code: string): Promise<SignInResultDto> {
    const signInResult = await this.authService.signIn(code);

    return signInResult;
  }

  // Test for get access token

  // @Get('getAccessToken')
  // async getAccessToken(@Query('code') code) {
  //   console.log('code: ', code);

  //   const axiosResult = await axios({
  //     method: 'post',
  //     url: `https://api.intra.42.fr/oauth/token`,
  //     data: {
  //       grant_type: 'authorization_code',
  //       client_id:
  //         'c44164aba01e6b4652fb6a4107e5188020a7e0c823b5013b2879b85ef7ea9abb',
  //       client_secret:
  //         'b3ee694a82c2014be143f7a31575cd6b15c3e7bf3fbf0ba7ca6de057e9f8673d',
  //       redirect_uri: 'http://localhost:3000/auth/getAccessToken',
  //       code,
  //     },
  //   });

  //   const access_token = axiosResult.data.access_token;
  //   console.log('access_token: ', access_token);

  //   const tokenInfo = await axios({
  //     method: 'get',
  //     url: `https://api.intra.42.fr/oauth/token/info`,
  //     headers: { Authorization: `Bearer ${access_token}` },
  //   });

  //   const tokenData = tokenInfo.data;
  //   console.log('tokenData: ', tokenData);

  //   const me = await axios({
  //     method: 'get',
  //     url: `https://api.intra.42.fr/v2/me`,
  //     headers: { Authorization: `Bearer ${access_token}` },
  //   });

  //   const { email, login, first_name, last_name } = me.data;
  //   console.log('email: ', email);
  //   console.log('login: ', login);
  //   console.log('first_name: ', first_name);
  //   console.log('last_name: ', last_name);

  //   return 'check the output in the console';
  // }
}
