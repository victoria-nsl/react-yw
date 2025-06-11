import { TIngredient, TUser } from './types';

const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export type TResetRequest = {
	password: string;
	token: string;
};

export type TRegisterRequest = {
	email: string;
	password: string;
	name: string;
};

export type TLoginRequest = {
	email: string;
	password: string;
};

type TOrderResponse = {
	success: boolean;
	order: {
		number: number;
	};
	name: string;
};

type TAuthResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: TUser;
};

type TTokenResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
};

type TUserResponse = {
	success: boolean;
	user: TUser;
};

type TSuccessResponse = {
	success: boolean;
	message: string;
};

const checkResponse = (response: Response) => {
	return response.ok
		? response.json()
		: response.json().then((error) => Promise.reject(error));
};

export const getIngredients = (): Promise<TIngredient[]> => {
	return fetch(`${BURGER_API_URL}/ingredients`)
		.then(checkResponse)
		.then((data) => {
			if (data?.success) return data.data;
			return Promise.reject(data);
		});
};

export const addOrder = (ids: string[]): Promise<TOrderResponse> => {
	return fetch(`${BURGER_API_URL}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			ingredients: ids,
		}),
	})
		.then(checkResponse)
		.then((data) => {
			if (data?.success) return data;
			return Promise.reject(data);
		});
};

export const forgotPasswordApi = (requestForgot: {
	email: string;
}): Promise<TSuccessResponse> => {
	return fetch(`${BURGER_API_URL}/password-reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(requestForgot),
	})
		.then(checkResponse)
		.then((data) => {
			if (data?.success) return data;
			return Promise.reject(data);
		});
};

export const resetPasswordApi = (
	requestReset: TResetRequest
): Promise<TSuccessResponse> => {
	console.log(requestReset);
	return fetch(`${BURGER_API_URL}/password-reset/reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(requestReset),
	})
		.then(checkResponse)
		.then((data) => {
			if (data?.success) return data;
			return Promise.reject(data);
		});
};

export const registerApi = (
	requestRegister: TRegisterRequest
): Promise<TAuthResponse> => {
	return fetch(`${BURGER_API_URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(requestRegister),
	})
		.then(checkResponse)
		.then((data) => {
			if (data?.success) {
				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('accessToken', data.accessToken);
				return data.user;
			}
			return Promise.reject(data);
		});
};

export const loginApi = (
	requestLogin: TLoginRequest
): Promise<TAuthResponse> => {
	return fetch(`${BURGER_API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(requestLogin),
	})
		.then(checkResponse)
		.then((data) => {
			if (data?.success) {
				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('accessToken', data.accessToken);
				return data.user;
			}
			return Promise.reject(data);
		});
};

export const logoutApi = (): Promise<TSuccessResponse> => {
	return fetch(`${BURGER_API_URL}/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	})
		.then(checkResponse)
		.then((data) => {
			if (data?.success) return data;
			return Promise.reject(data);
		});
};

export const getUserApi = (): Promise<TUserResponse> => {
	return fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken'),
		},
	})
		.then(checkResponse)
		.then((data) => {
			if (data?.success) return data.user;
			return Promise.reject(data);
		});
};

export const updateUserApi = (
	requestUpdateUser: TRegisterRequest
): Promise<TUserResponse> => {
	return fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify(requestUpdateUser),
	})
		.then(checkResponse)
		.then((data) => {
			if (data?.success) return data.user;
			return Promise.reject(data);
		});
};

export const refreshTokenApi = (): Promise<TTokenResponse> => {
	return fetch(`${BURGER_API_URL}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(checkResponse)
		.then((data) => {
			if (data.success) {
				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('accessToken', data.accessToken);
				return data;
			}

			return Promise.reject(data);
		});
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchWithRefresh = async (url: string, options: any) => {
	try {
		const res = await fetch(url, options);
		return await checkResponse(res);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshTokenApi();
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options);
			return await checkResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
