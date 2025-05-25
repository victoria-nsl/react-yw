import { TIngredient, TIngredientCategories } from '@/utils/types';
import { createSelector } from 'reselect';

type TIngredientsState = {
	ingredients: { loading: boolean; error: boolean; items: TIngredient[] };
};

export const getAllIngredients = (state: TIngredientsState) =>
	state.ingredients;

export const getTasksByCategory = (category: TIngredientCategories) =>
	createSelector([(state) => state.ingredients.items], (ingredients) =>
		ingredients.filter(
			(ingredient: TIngredient) => ingredient.type === category
		)
	);
