import { TIngredient } from '@/utils/types';

type TIngredientsState = {
	ingredients: { loading: boolean; error: boolean; items: TIngredient[] };
};

export const getAllIngredients = (state: TIngredientsState) =>
	state.ingredients;
