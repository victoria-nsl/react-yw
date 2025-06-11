import { TUserState } from '@/utils/types';

export const getUser = (state: TUserState) => state.auth.user;

export const getIsAuthChecked = (state: TUserState) => state.auth.isAuthChecked;
