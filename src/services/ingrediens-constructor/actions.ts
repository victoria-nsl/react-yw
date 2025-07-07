import { TConstructorIngredient } from '@/utils/types';

export const ADD_CONSTRUCTOR_INGREDIENTS =
	'ADD_CONSTRUCTOR_INGREDIENTS' as const;
export const DELETE_CONSTRUCTOR_INGREDIENTS =
	'DELETE_CONSTRUCTOR_INGREDIENTS' as const;
export const UPDATE_CONSTRUCTOR_INGREDIENTS =
	'UPDATE_CONSTRUCTOR_INGREDIENTS' as const;

export interface IAddConstructorIngredientsAction {
	readonly type: typeof ADD_CONSTRUCTOR_INGREDIENTS;
	readonly payload: TConstructorIngredient;
}
export interface IDeleteConstructorIngredientsAction {
	readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENTS;
	readonly payload: TConstructorIngredient;
}

export interface IUpdateConstructorIngredientsAction {
	readonly type: typeof UPDATE_CONSTRUCTOR_INGREDIENTS;
	readonly payload: TConstructorIngredient[];
}

export type TConstructorIngredientsAction =
	| IAddConstructorIngredientsAction
	| IDeleteConstructorIngredientsAction
	| IUpdateConstructorIngredientsAction;

export const addConstructorIngredient = (
	ingredient: TConstructorIngredient
): IAddConstructorIngredientsAction => ({
	type: ADD_CONSTRUCTOR_INGREDIENTS,
	payload: ingredient,
});

export const deleteConstructorIngredient = (
	ingredient: TConstructorIngredient
): IDeleteConstructorIngredientsAction => ({
	type: DELETE_CONSTRUCTOR_INGREDIENTS,
	payload: ingredient,
});

export const updateConstructorIngredient = (
	ingredients: TConstructorIngredient[]
): IUpdateConstructorIngredientsAction => ({
	type: UPDATE_CONSTRUCTOR_INGREDIENTS,
	payload: ingredients,
});
