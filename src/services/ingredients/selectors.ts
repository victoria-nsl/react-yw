import {
	TIngredient,
	TIngredientCategories,
	TIngredientsState,
} from '@/utils/types';
import { createSelector } from 'reselect';

export const getAllIngredients = (state: TIngredientsState) =>
	state.ingredients;

export const getIngredientsByCategory = (category: TIngredientCategories) =>
	createSelector([(state) => state.ingredients.items], (ingredients) =>
		ingredients.filter(
			(ingredient: TIngredient) => ingredient.type === category
		)
	);

export const getIngredientById = (id: string) =>
	createSelector([(state) => state.ingredients.items], (ingredients) =>
		ingredients.find((ingredient: TIngredient) => ingredient._id === id)
	);
