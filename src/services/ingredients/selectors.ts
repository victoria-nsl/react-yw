import { TIngredient, TIngredientsCategoriesKeys } from '@/utils/types';
import { createAppSelector, TRootState } from '../store';

export const getAllIngredients = (state: TRootState) => state.ingredients;

export const getIngredientsByCategory = (
	category: TIngredientsCategoriesKeys
) =>
	createAppSelector(
		[(state) => state.ingredients.items],
		(ingredients: TIngredient[]) =>
			ingredients.filter((ingredient) => ingredient.type === category)
	);

export const getIngredientById = (id: string) =>
	createAppSelector(
		[(state) => state.ingredients.items],
		(ingredients: TIngredient[]) =>
			ingredients.find((ingredient) => ingredient._id === id)!
	);
