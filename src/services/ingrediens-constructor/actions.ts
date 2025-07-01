import { TConstructorIngredient } from '@/utils/types';

export const ADD_CONSTRUCTOR_INGREDIENTS = 'ADD_CONSTRUCTOR_INGREDIENTS';
export const DELETE_CONSTRUCTOR_INGREDIENTS = 'DELETE_CONSTRUCTOR_INGREDIENTS';
export const UPDATE_CONSTRUCTOR_INGREDIENTS = 'UPDATE_CONSTRUCTOR_INGREDIENTS';

export type TConstructorIngredientsAction =
	| {
			type: 'ADD_CONSTRUCTOR_INGREDIENTS' | 'DELETE_CONSTRUCTOR_INGREDIENTS';
			payload: TConstructorIngredient;
	  }
	| {
			type: 'UPDATE_CONSTRUCTOR_INGREDIENTS';
			payload: TConstructorIngredient[];
	  };

export const addConstructorIngredient = (
	ingredient: TConstructorIngredient
): TConstructorIngredientsAction => ({
	type: ADD_CONSTRUCTOR_INGREDIENTS,
	payload: ingredient,
});

export const deleteConstructorIngredient = (
	ingredient: TConstructorIngredient
): TConstructorIngredientsAction => ({
	type: DELETE_CONSTRUCTOR_INGREDIENTS,
	payload: ingredient,
});

export const updateConstructorIngredient = (
	ingredients: TConstructorIngredient[]
): TConstructorIngredientsAction => ({
	type: UPDATE_CONSTRUCTOR_INGREDIENTS,
	payload: ingredients,
});
