export class UserDataDto {
  username: string;

  avatar: string;

  email: string;

  secondAuth: boolean;
}

export class LoggdInUserDataDto extends UserDataDto {
  accessToken: string;
}
