import { TConstructorIngredient } from '@/utils/types';

export const ADD_CONSTRUCTOR_INGREDIENTS = 'ADD_CONSTRUCTOR_INGREDIENTS';
export const DELETE_CONSTRUCTOR_INGREDIENTS = 'DELETE_CONSTRUCTOR_INGREDIENTS';

export type TConstructorIngredientsAction = {
	type: string;
	payload: TConstructorIngredient;
};

export const addConstructorIngredient = (
	ingredient: TConstructorIngredient
): TConstructorIngredientsAction => ({
	type: ADD_CONSTRUCTOR_INGREDIENTS,
	payload: ingredient,
});

export const deleteonstructorIngredient = (
	ingredient: TConstructorIngredient
): TConstructorIngredientsAction => ({
	type: DELETE_CONSTRUCTOR_INGREDIENTS,
	payload: ingredient,
});
