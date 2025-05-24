import { TIngredient } from '@/utils/types';

type TIngredientsState = {
	loading: boolean;
	error: boolean;
	items: TIngredient[];
};

export const getAllIngredients = (state: { ingredients: TIngredientsState }) =>
	state.ingredients;
