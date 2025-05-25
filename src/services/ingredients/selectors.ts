import {
	TIngredient,
	TIngredientCategories,
	TIngredientsState,
} from '@/utils/types';
import { createSelector } from 'reselect';

export const getAllIngredients = (state: TIngredientsState) =>
	state.ingredients;

export const getTasksByCategory = (category: TIngredientCategories) =>
	createSelector([(state) => state.ingredients.items], (ingredients) =>
		ingredients.filter(
			(ingredient: TIngredient) => ingredient.type === category
		)
	);
