export interface User {
  id: number;
  nickname: string;
  username: string;
  email: string;
  avatar: string;
  secondAuth: boolean;
  accessToken?: string;
  isSigned: boolean;
}

export interface RoomListInterface {
  id: number;
  title: string;
  isPublic: boolean;
  playerCount: number;
  isLadder: boolean;
  isGameStart?: boolean;
}

export const LOGIN = 'LOGIN' as const;
export const LOGOUT = 'LOGOUT' as const;
export const SET_NICKNAME = 'SET_NICKNAME' as const;
export const SECOND_AUTH = 'SECOND_AUTH' as const;

export type UserStateType = 'LOGIN' | 'LOGOUT' | 'SET_NICKNAME' | 'SECOND_AUTH';

export const GAME = 'GAME' as const;
export const CHAT = 'CHAT' as const;

export type MenuType = 'GAME' | 'CHAT';
