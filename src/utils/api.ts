import { TIngredient } from './types';

const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

type TIngredientsResponse = {
	success: boolean;
	data: TIngredient[];
};

export const getIngredients = async (): Promise<TIngredientsResponse> => {
	const res = await fetch(`${BURGER_API_URL}/ingredients`);
	const data = await res.json();
	return data;
};
