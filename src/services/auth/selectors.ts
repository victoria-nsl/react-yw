import { TUserState } from '@/utils/types';

export const getAuth = (state: TUserState) => state.auth;

export const getIsAuthChecked = (state: TUserState) => state.auth.isAuthChecked;

export const getUser = (state: TUserState) => state.auth.user;
