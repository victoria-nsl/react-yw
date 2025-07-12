import { TAuthState, TNameEmailUser } from '@/utils/types';

export type TAuthStore = {
	auth: TAuthState;
};

export const getAuth = (state: TAuthStore): TAuthState => state.auth;

export const getIsAuthChecked = (state: TAuthStore): boolean =>
	state.auth.isAuthChecked;

export const getUser = (state: TAuthStore): TNameEmailUser | null =>
	state.auth.user;
