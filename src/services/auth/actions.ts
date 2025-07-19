import {
	getUserApi,
	loginApi,
	logoutApi,
	registerApi,
	updateUserApi,
} from '@/utils/api';
import { TEmailPasswordUser, TNameEmailUser, TUser } from '@/utils/types';
import { AppThunk } from '../store';

export const SET_USER = 'SET_USER' as const;
export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED' as const;

export interface ISetUserAuthAction {
	readonly type: typeof SET_USER;
	readonly payload: TNameEmailUser | null;
}

export interface ISetIsAuthCheckedAuthAction {
	readonly type: typeof SET_IS_AUTH_CHECKED;
	readonly payload: boolean;
}

export type TAuthAction = ISetUserAuthAction | ISetIsAuthCheckedAuthAction;

export const registerUser =
	(form: TUser): AppThunk =>
	(dispatch) => {
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
	(form: TEmailPasswordUser): AppThunk =>
	(dispatch) => {
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
	(form: TUser): AppThunk =>
	(dispatch) => {
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

export const logoutUser = (): AppThunk => (dispatch) => {
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

export const checkUserAuth = (): AppThunk => (dispatch) => {
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
