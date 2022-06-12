export interface User {
  id: number;
  nickname: string;
  email: string;
  profileImg: string;
  secondAuth: boolean;
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_NICKNAME = 'SET_NICKNAME';
export const SECOND_AUTH = 'SECOND_AUTH';

export type UserStateType = 'LOGIN' | 'LOGOUT' | 'SET_NICKNAME' | 'SECOND_AUTH';
