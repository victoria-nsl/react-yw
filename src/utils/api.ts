import { TIngredient } from './types';

type TIngredientsResponse = {
	success: boolean;
	data: TIngredient[];
};

export const getIngredients = async (): Promise<TIngredientsResponse> => {
	const url = 'https://norma.nomoreparties.space/api/ingredients';

	const res = await fetch(url);
	const data = await res.json();
	return data;
};
