import { TRootState } from '../store';

export const getAuth = (state: TRootState) => state.auth;

export const getIsAuthChecked = (state: TRootState) => state.auth.isAuthChecked;

export const getUser = (state: TRootState) => state.auth.user;
