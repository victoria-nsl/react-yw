import { TIngredient } from '@/utils/types';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT';

export type TCurrentIngredientAction =
	| {
			type: 'SET_CURRENT_INGREDIENT';
			payload?: TIngredient;
	  }
	| {
			type: 'DELETE_CURRENT_INGREDIENT';
	  };

export const setCurrentIngredient = (
	ingredient: TIngredient
): TCurrentIngredientAction => ({
	type: SET_CURRENT_INGREDIENT,
	payload: ingredient,
});

export const deleteCurrentIngredient = (): TCurrentIngredientAction => ({
	type: DELETE_CURRENT_INGREDIENT,
});
