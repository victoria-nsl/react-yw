import { TConstructorIngredient } from '@/utils/types';
import {
	ADD_CONSTRUCTOR_INGREDIENTS,
	DELETE_CONSTRUCTOR_INGREDIENTS,
	UPDATE_CONSTRUCTOR_INGREDIENTS,
	TConstructorIngredientsAction,
} from './actions';

const initialState = {
	bun: null,
	itemsConstructor: [],
};

export const constructorIngredientsReducer = (
	state = initialState,
	action: TConstructorIngredientsAction
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

		case UPDATE_CONSTRUCTOR_INGREDIENTS:
			return {
				...state,
				itemsConstructor: action.payload,
			};

		default:
			return state;
	}
};
