import {
	TIngredient,
	TIngredientsCategoriesKeys,
	TIngredientsState,
} from '@/utils/types';
import { createSelector } from 'reselect';

export type TIngredientsStore = {
	ingredients: TIngredientsState;
};

export const getAllIngredients = (
	state: TIngredientsStore
): TIngredientsState => state.ingredients;

export const getIngredientsByCategory = (
	category: TIngredientsCategoriesKeys
) =>
	createSelector(
		[(state) => state.ingredients.items],
		(ingredients): TIngredient[] =>
			ingredients.filter(
				(ingredient: TIngredient) => ingredient.type === category
			)
	);

export const getIngredientById = (id: string) =>
	createSelector(
		[(state) => state.ingredients.items],
		(ingredients): TIngredient =>
			ingredients.find((ingredient: TIngredient) => ingredient._id === id)
	);
