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
	action: { type: string; payload: TConstructorIngredient }
) => {
	switch (action.type) {
		case ADD_CONSTRUCTOR_INGREDIENTS:
			return {
				...state,
				bun: action.payload.type === 'bun' ? action.payload : state.bun,
				itemsConstructor:
					action.payload.type !== 'bun'
						? [...state.itemsConstructor, action.payload]
						: [...state.itemsConstructor],
			};
		case DELETE_CONSTRUCTOR_INGREDIENTS:
			return {
				...state,
				itemsConstructor: state.itemsConstructor.filter(
					(item: TConstructorIngredient) => item.id !== action.payload.id
				),
			};

		default:
			return state;
	}
};
