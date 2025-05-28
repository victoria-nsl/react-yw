import { TIngredient } from './types';

const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

type TOrderResponse = {
	success: boolean;
	order: {
		number: number;
	};
	name: string;
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
