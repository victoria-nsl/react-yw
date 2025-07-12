import {
	TIngredient,
	TIngredientsCategoriesKeys,
	TIngredientsState,
} from '@/utils/types';
import { createAppSelector } from '../store';

export type TIngredientsStore = {
	ingredients: TIngredientsState;
};

export const getAllIngredients = (
	state: TIngredientsStore
): TIngredientsState => state.ingredients;

export const getIngredientsByCategory = (
	category: TIngredientsCategoriesKeys
) =>
	createAppSelector(
		[(state) => state.ingredients.items],
		(ingredients: TIngredient[]) =>
			ingredients.filter(
				(ingredient: TIngredient) => ingredient.type === category
			)
	);

export const getIngredientById = (id: string) =>
	createAppSelector(
		[(state) => state.ingredients.items],
		(ingredients: TIngredient[]) =>
			ingredients.find((ingredient: TIngredient) => ingredient._id === id)
	);
