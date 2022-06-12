import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LoggdInUserDataDto, UserDataDto } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async getAccessToken(code: string): Promise<string> {
    const axiosResult = await axios({
      method: 'post',
      url: `https://api.intra.42.fr/oauth/token`,
      data: {
        grant_type: 'authorization_code',
        client_id:
          'c44164aba01e6b4652fb6a4107e5188020a7e0c823b5013b2879b85ef7ea9abb',
        client_secret:
          'b3ee694a82c2014be143f7a31575cd6b15c3e7bf3fbf0ba7ca6de057e9f8673d',
        redirect_uri: 'http://localhost:3000/auth/logIn',
        code,
      },
    });

    return axiosResult.data.access_token;
  }

  async getUserData(accessToken: string): Promise<UserDataDto> {
    const axiosResult = await axios({
      method: 'GET',
      url: 'https://api.intra.42.fr/v2/me',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const { email, login, image_url } = axiosResult.data;
    const userData: UserDataDto = {
      username: login,
      avatar: image_url,
      email,
      secondAuth: false,
    };
    return userData;
  }

  async logIn(code: string): Promise<LoggdInUserDataDto> {
    const accessToken = await this.getAccessToken(code);
    const userData = await this.getUserData(accessToken);

    let user = await this.usersService.getUserByEmail(userData.email);
    if (!user) {
      user = await this.usersService.createUser(userData);
    }

    const loggedInUser: UserDataDto = {
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      secondAuth: user.secondAuth,
    };
    return { ...loggedInUser, accessToken };
  }
}
