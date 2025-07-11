import {
	getUserApi,
	loginApi,
	logoutApi,
	registerApi,
	updateUserApi,
} from '@/utils/api';
import { TEmailPasswordUser, TNameEmailUser, TUser } from '@/utils/types';

export const SET_USER = 'SET_USER';
export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED';

export type TAuthAction =
	| {
			type: 'SET_USER';
			payload?: TNameEmailUser | null;
	  }
	| {
			type: 'SET_IS_AUTH_CHECKED';
			payload?: boolean;
	  };

export const registerUser =
	(form: TUser) => (dispatch: (arg0: TAuthAction) => void) => {
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
	(form: TEmailPasswordUser) => (dispatch: (arg0: TAuthAction) => void) => {
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
	(form: TUser) => (dispatch: (arg0: TAuthAction) => void) => {
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

export const logoutUser = () => (dispatch: (arg0: TAuthAction) => void) => {
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

export const checkUserAuth = () => (dispatch: (arg0: TAuthAction) => void) => {
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
