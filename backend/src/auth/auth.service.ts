import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { UpdateUserDto, UserProfileDto } from 'src/users/dto/users.dto';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { IsSignedUpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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
        redirect_uri: 'http://localhost:3000/callback',
        code,
      },
    });

    return axiosResult.data.access_token;
  }

  makeRand6Num = (): number => {
    const randNum = Math.floor(Math.random() * 1000000);
    return randNum;
  };

  async getUserEmail(accessToken: string): Promise<string> {
    const axiosResult = await axios({
      method: 'GET',
      url: 'https://api.intra.42.fr/v2/me',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const { email } = axiosResult.data;
    return email;
  }

  userToIsSignedUpDto(user: User): IsSignedUpDto {
    const isSignedUpDto = new IsSignedUpDto();

    isSignedUpDto.nickname = user.nickname;
    isSignedUpDto.avatar = user.avatar;
    isSignedUpDto.isSecondAuthOn = user.isSecondAuthOn;
    isSignedUpDto.jwt = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
    return isSignedUpDto;
  }

  async isSignedUp(code: string): Promise<IsSignedUpDto> {
    const accessToken = await this.getAccessToken(code);
    const userEmail = await this.getUserEmail(accessToken);

    const user = await this.usersService.getUserByEmail(userEmail);

    const isSignedUpDto = new IsSignedUpDto();
    isSignedUpDto.user.avatar = user.avatar;
    isSignedUpDto.user.email = user.email;
    isSignedUpDto.isSecondAuth = false;
    isSignedUpDto.jwt = null;

    if (!user) {
      const createdUser = await this.usersService.createUser({
        email: userEmail,
      });

      return this.userToIsSignedUpDto(createdUser);
    }

    return this.userToIsSignedUpDto(user);
  }

  async signUp(updateUserDto: UpdateUserDto): Promise<UserProfileDto> {
    if (
      updateUserDto.nickname &&
      (await this.isDuplicateNickname(updateUserDto.nickname))
    ) {
      throw new BadRequestException('중복된 닉네임 입니다.');
    }

    return await this.usersService.updateUser(updateUserDto);
  }

  async isDuplicateNickname(nickname: string): Promise<boolean> {
    if (nickname.length < 2 || nickname.length > 8) {
      throw new BadRequestException('닉네임은 최소2자 최대 8자 입니다.');
    }

    return await this.usersService.isDuplicateNickname(nickname);
  }
}
