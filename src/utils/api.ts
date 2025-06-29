import {
	TIngredient,
	TUser,
	TEmailPasswordUser,
	TResetUser,
	TEmailUser,
} from './types';

const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

//Response
export type TSuccessResponse = {
	success: boolean;
	message: string;
};

export type TIngredientsResponse = {
	success: boolean;
	data: TIngredient[];
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

export type TTokenResponse = Omit<TAuthResponse, 'user'>;

export type TUserResponse = Omit<TAuthResponse, 'accessToken' | 'refreshToken'>;

//Request
export type TRequestInitFetchWithRefresh = RequestInit & {
	headers: Record<string, string>;
};

const checkResponse = <T>(response: Response): Promise<T> => {
	return response.ok
		? response.json()
		: response.json().then((error) => {
				return Promise.reject(error);
			});
};

export const getIngredients = (): Promise<TIngredient[]> => {
	return fetch(`${BURGER_API_URL}/ingredients`)
		.then(checkResponse<TIngredientsResponse>)
		.then((data) => {
			if (data?.success) return data.data;
			return Promise.reject(data);
		});
};

export const addOrder = async (ids: string[]): Promise<TOrderResponse> => {
	const data = await fetchWithRefresh<TOrderResponse>(
		`${BURGER_API_URL}/orders`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: localStorage.getItem('accessToken')!,
			},
			body: JSON.stringify({
				ingredients: ids,
			}),
		}
	);

	if (data?.success) return data;
	return Promise.reject(data);
};

export const forgotPasswordApi = (
	form: TEmailUser
): Promise<TSuccessResponse> => {
	return fetch(`${BURGER_API_URL}/password-reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(form),
	})
		.then(checkResponse<TSuccessResponse>)
		.then((data) => {
			if (data?.success) return data;
			return Promise.reject(data);
		});
};

export const resetPasswordApi = (
	form: TResetUser
): Promise<TSuccessResponse> => {
	return fetch(`${BURGER_API_URL}/password-reset/reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(form),
	})
		.then(checkResponse<TSuccessResponse>)
		.then((data) => {
			if (data?.success) return data;
			return Promise.reject(data);
		});
};

export const registerApi = (form: TUser): Promise<TAuthResponse> => {
	return fetch(`${BURGER_API_URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(form),
	})
		.then(checkResponse<TAuthResponse>)
		.then((data) => {
			if (data?.success) {
				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('accessToken', data.accessToken);
				return data;
			}
			return Promise.reject(data);
		});
};

export const loginApi = (form: TEmailPasswordUser): Promise<TAuthResponse> => {
	return fetch(`${BURGER_API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(form),
	})
		.then(checkResponse<TAuthResponse>)
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
		.then(checkResponse<TSuccessResponse>)
		.then((data) => {
			if (data?.success) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				return data;
			}
			return Promise.reject(data);
		});
};

export const getUserApi = async (): Promise<TUserResponse> => {
	const data = await fetchWithRefresh<TUserResponse>(
		`${BURGER_API_URL}/auth/user`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: localStorage.getItem('accessToken')!,
			},
		}
	);
	if (data?.success) return data;

	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
	return Promise.reject(data);
};

export const updateUserApi = async (form: TUser): Promise<TUserResponse> => {
	const data = await fetchWithRefresh<TUserResponse>(
		`${BURGER_API_URL}/auth/user`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: localStorage.getItem('accessToken')!,
			},
			body: JSON.stringify(form),
		}
	);
	if (data?.success) return data;
	return Promise.reject(data);
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
		.then(checkResponse<TTokenResponse>)
		.then((data) => {
			if (data.success) {
				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('accessToken', data.accessToken);
				return data;
			}

			return Promise.reject(data);
		});
};

export const fetchWithRefresh = async <T>(
	url: string,
	options: TRequestInitFetchWithRefresh
): Promise<T> => {
	try {
		const res = await fetch(url, options);
		return await checkResponse(res);
	} catch (err: unknown) {
		if ((err as Error).message === 'jwt expired') {
			const refreshData = await refreshTokenApi();
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options);
			return await checkResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
