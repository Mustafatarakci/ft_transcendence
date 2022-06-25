import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: '유저 id' })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: '아바타' })
  @IsString()
  avatar: string;

  @ApiProperty({ description: '이메일' })
  @IsString()
  nickname: string;
}

export class EmailDto {
  @ApiProperty({ description: '이메일' })
  @IsEmail()
  email: string;
}

export class SimpleUserDto {
  @ApiProperty({ description: '유저 id' })
  id: number;

  @ApiProperty({ description: '닉네임' })
  nickname: string;
}

export class UserProfileDto {
  @ApiProperty({ description: '유저 id' })
  id: number;

  @ApiProperty({ description: '유저 닉네임' })
  nickname: string;

  @ApiProperty({ description: '유저 아바타' })
  avatar: string;

  @ApiProperty({ description: '유저 이메일' })
  email: string;

  @ApiProperty({ description: '일반게임 승리 카운트' })
  winCount: number;

  @ApiProperty({ description: '일반게임 패배 카운트' })
  loseCount: number;

  @ApiProperty({ description: '래더게임 승리 카운트' })
  ladderWinCount: number;

  @ApiProperty({ description: '래임게임 패배 카운트' })
  ladderLoseCount: number;
}
