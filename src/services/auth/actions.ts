import { registerApi, TRegisterRequest } from '@/utils/api';
import { TUser } from '@/utils/types';

export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHECK_AUTH = 'CHECK_AUTH';
export const AUTH_ERROR = 'AUTH_ERROR';

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
	  }
	| {
			type: 'AUTH_ERROR';
			payload?: string;
	  };

export const registerUser =
	(form: TRegisterRequest) => (dispatch: (arg0: TAuthAction) => void) => {
		return registerApi(form)
			.then((res) => {
				dispatch({
					type: REGISTER,
					payload: res.user,
				});
			})
			.catch((err) => {
				dispatch({
					type: AUTH_ERROR,
					payload: err.message,
				});
			});
	};
