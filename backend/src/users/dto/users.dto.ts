import { IsBoolean, IsString } from 'class-validator';

export class UserDataDto {
  @IsString()
  username: string;

  @IsString()
  avatar: string;

  @IsString()
  email: string;

  @IsBoolean()
  secondAuth: boolean;
}

export class SignInResultDto extends UserDataDto {
  @IsString()
  accessToken: string;

  @IsBoolean()
  isSigned: boolean;
}

export class CreateUserDto extends UserDataDto {
  @IsString()
  nickname: string;
}
