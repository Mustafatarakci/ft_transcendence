import { ApiProperty } from '@nestjs/swagger';

export class IsSignedUpDto {
  @ApiProperty({ description: '닉네임' })
  nickname: string;

  @ApiProperty({ description: '유저 데이터' })
  avatar: string;

  @ApiProperty({ description: '2차 인증 여부 ' })
  isSecondAuthOn: boolean;

  @ApiProperty({ description: 'jwt' })
  jwt: string | null;
}
