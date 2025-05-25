import { TConstructorIngredient } from '@/utils/types';
import {
	ADD_CONSTRUCTOR_INGREDIENTS,
	DELETE_CONSTRUCTOR_INGREDIENTS,
} from './actions';

const initialState = {
	bun: null,
	itemsConstructor: [],
};

export const constructorIngredientsReducer = (
	state = initialState,
	action: { type: string; payload: TConstructorIngredient | string }
) => {
	switch (action.type) {
		case ADD_CONSTRUCTOR_INGREDIENTS:
			return {
				...state,
			};
		case DELETE_CONSTRUCTOR_INGREDIENTS:
			return {
				...state,
			};

		default:
			return state;
	}
};
