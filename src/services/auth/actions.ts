import { TUser } from '@/utils/types';

export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHECK_AUTH = 'CHECK_AUTH';

export type TAuthAction =
	| {
			type: 'REGISTER';
			payload?: TUser;
	  }
	| {
			type: 'LOGIN';
			payload?: TUser;
	  }
	| {
			type: 'CHECK_AUTH';
			payload?: TUser;
	  }
	| {
			type: 'LOGOUT';
	  };
