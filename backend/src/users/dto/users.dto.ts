export class UserDataDto {
  username: string;

  avatar: string;

  email: string;

  secondAuth: boolean;
}

export class SignInResultDto extends UserDataDto {
  accessToken: string;

  isSigned: boolean;
}
