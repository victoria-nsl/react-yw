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

export type TOrderResponse = {
	success: boolean;
	order: {
		number: number;
	};
	name: string;
};

export type TAuthResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: TUser;
};

export type TTokenResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
};

export type TUserResponse = {
	success: boolean;
	user: TUser;
};

export type TSuccessResponse = {
	success: boolean;
	message: string;
};

const checkResponse = (response: Response) => {
	return response.ok
		? response.json()
		: response.json().then((error) => {
				return Promise.reject(error);
			});
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

export const forgotPasswordApi = (form: {
	email: string;
}): Promise<TSuccessResponse> => {
	return fetch(`${BURGER_API_URL}/password-reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(form),
	})
		.then(checkResponse)
		.then((data) => {
			if (data?.success) return data;
			return Promise.reject(data);
		});
};

export const resetPasswordApi = (
	form: TResetRequest
): Promise<TSuccessResponse> => {
	return fetch(`${BURGER_API_URL}/password-reset/reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(form),
	})
		.then(checkResponse)
		.then((data) => {
			if (data?.success) return data;
			return Promise.reject(data);
		});
};

export const registerApi = (form: TRegisterRequest): Promise<TAuthResponse> => {
	return fetch(`${BURGER_API_URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(form),
	})
		.then(checkResponse)
		.then((data) => {
			if (data?.success) {
				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('accessToken', data.accessToken);
				return data;
			}
			return Promise.reject(data);
		});
};

export const loginApi = (form: TLoginRequest): Promise<TAuthResponse> => {
	return fetch(`${BURGER_API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(form),
	})
		.then(checkResponse)
		.then((data) => {
			if (data?.success) {
				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('accessToken', data.accessToken);
				return data;
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
			if (data?.success) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				return data;
			}
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
	}).then((data) => {
		if (data?.success) return data;

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		return Promise.reject(data);
	});
};

export const updateUserApi = (
	form: TRegisterRequest
): Promise<TUserResponse> => {
	return fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify(form),
	}).then((data) => {
		if (data?.success) return data;
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
