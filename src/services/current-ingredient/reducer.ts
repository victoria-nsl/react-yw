import { TIngredient } from '@/utils/types';
import { SET_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT } from './actions';

const initialState = {
	currentItem: null,
};

export const currentIngredientReducer = (
	state = initialState,
	action: { type: string; payload: TIngredient }
) => {
	switch (action.type) {
		case SET_CURRENT_INGREDIENT:
			return {
				...state,
				currentItem: action.payload,
			};
		case DELETE_CURRENT_INGREDIENT:
			return {
				...state,
				currentItem: null,
			};

		default:
			return state;
	}
};
