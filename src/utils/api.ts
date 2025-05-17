import { TIngredient } from './types';

const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

type TIngredientsResponse = {
	success: boolean;
	data: TIngredient[];
};

const checkResponse = (response: Response): Promise<TIngredientsResponse> => {
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
