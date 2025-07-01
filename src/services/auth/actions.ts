import {
	getUserApi,
	loginApi,
	logoutApi,
	registerApi,
	updateUserApi,
} from '@/utils/api';
import { TEmailPasswordUser, TNameEmailUser, TUser } from '@/utils/types';
import { Dispatch } from 'redux';

export const SET_USER = 'SET_USER';
export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED';

export type TAuthAction =
	| {
			type: 'SET_USER';
			payload: TNameEmailUser | null;
	  }
	| {
			type: 'SET_IS_AUTH_CHECKED';
			payload: boolean;
	  };

export const registerUser =
	(form: TUser) => (dispatch: Dispatch<TAuthAction>) => {
		return registerApi(form)
			.then((res) => {
				dispatch({
					type: SET_USER,
					payload: res.user,
				});
				dispatch({ type: SET_IS_AUTH_CHECKED, payload: true });
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

export const loginUser =
	(form: TEmailPasswordUser) => (dispatch: Dispatch<TAuthAction>) => {
		return loginApi(form)
			.then((res) => {
				dispatch({
					type: SET_USER,
					payload: res.user,
				});
				dispatch({ type: SET_IS_AUTH_CHECKED, payload: true });
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

export const updateUser =
	(form: TUser) => (dispatch: Dispatch<TAuthAction>) => {
		return updateUserApi(form)
			.then((res) => {
				dispatch({
					type: SET_USER,
					payload: res.user,
				});
				dispatch({ type: SET_IS_AUTH_CHECKED, payload: true });
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

export const logoutUser = () => (dispatch: Dispatch<TAuthAction>) => {
	return logoutApi()
		.then(() => {
			dispatch({
				type: SET_USER,
				payload: null,
			});
		})
		.catch((err) => {
			console.log(err.message);
		});
};

export const checkUserAuth = () => (dispatch: Dispatch<TAuthAction>) => {
	if (!localStorage.getItem('accessToken')) {
		dispatch({
			type: SET_IS_AUTH_CHECKED,
			payload: true,
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
			console.log(err.message);
		})
		.finally(() => dispatch({ type: SET_IS_AUTH_CHECKED, payload: true }));
};
