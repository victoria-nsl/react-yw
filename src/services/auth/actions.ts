import {
	getUserApi,
	loginApi,
	logoutApi,
	registerApi,
	updateUserApi,
	TLoginRequest,
	TRegisterRequest,
} from '@/utils/api';
import { TUser } from '@/utils/types';

export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED';

export type TAuthAction =
	| {
			type: 'SET_USER';
			payload?: TUser;
	  }
	| {
			type: 'SET_IS_AUTH_CHECKED';
			payload?: TUser;
	  }
	| {
			type: 'LOGOUT_USER';
	  };

export const registerUser =
	(form: TRegisterRequest) => (dispatch: (arg0: TAuthAction) => void) => {
		return registerApi(form)
			.then((res) => {
				dispatch({
					type: SET_USER,
					payload: res.user,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

export const loginUser =
	(form: TLoginRequest) => (dispatch: (arg0: TAuthAction) => void) => {
		return loginApi(form)
			.then((res) => {
				dispatch({
					type: SET_USER,
					payload: res.user,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

export const updateUser =
	(form: TRegisterRequest) => (dispatch: (arg0: TAuthAction) => void) => {
		return updateUserApi(form)
			.then((res) => {
				dispatch({
					type: SET_USER,
					payload: res.user,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

export const logoutUser = () => (dispatch: (arg0: TAuthAction) => void) => {
	return logoutApi()
		.then(() => {
			dispatch({
				type: LOGOUT_USER,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

export const checkUserAuth = () => (dispatch: (arg0: TAuthAction) => void) => {
	if (!localStorage.getItem('accessToken')) {
		dispatch({
			type: SET_IS_AUTH_CHECKED,
		});
		return;
	}

	return getUserApi()
		.then((res) => {
			dispatch({
				type: SET_USER,
				payload: res.user,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
