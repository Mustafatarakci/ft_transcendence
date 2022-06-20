export interface User {
  id: number;
  nickname: string;
  email: string;
  profileImg: string;
  secondAuth: boolean;
}

export interface IUserList {
  id: number;
  username: string;
  isfriend: boolean;
  status: 'on' | 'off' | 'play';
}

export const ON = 'on' as const;
export const OFF = 'off' as const;
export const PLAY = 'play' as const;

export const LOGIN = 'LOGIN' as const;
export const LOGOUT = 'LOGOUT' as const;
export const SET_NICKNAME = 'SET_NICKNAME' as const;
export const SECOND_AUTH = 'SECOND_AUTH' as const;

export type UserStateType = 'LOGIN' | 'LOGOUT' | 'SET_NICKNAME' | 'SECOND_AUTH';
