import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class IsSignedUpDto {
  @ApiProperty({ description: '닉네임' })
  @IsString()
  nickname: string;

  @ApiProperty({ description: '이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '유저 데이터' })
  @IsString()
  avatar: string;

  @ApiProperty({ description: '2차 인증 여부 ' })
  isSecondAuthOn: boolean;

  @ApiProperty({ description: 'jwt' })
  jwt: string | null;
}
