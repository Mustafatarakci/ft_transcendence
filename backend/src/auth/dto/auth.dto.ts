import { ApiProperty } from '@nestjs/swagger';
import { BasicUserDataDto } from 'src/users/dto/users.dto';

export class IsSignedUpDto {
  @ApiProperty({ description: '유저 데이터' })
  user: BasicUserDataDto;

  @ApiProperty({ description: '2차 인증 여부 ' })
  isSecondAuth: boolean;

  @ApiProperty({
    description:
      '회원가입이 되어 있을 경우 jwt를 리턴, 회원가입이 되어 있지 않으면 null 리턴',
  })
  jwt: string | null;
}
