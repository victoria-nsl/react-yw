import {
	TConstructorIngredient,
	TIngredientsConstructorState,
} from '@/utils/types';
import {
	ADD_CONSTRUCTOR_INGREDIENTS,
	DELETE_CONSTRUCTOR_INGREDIENTS,
	UPDATE_CONSTRUCTOR_INGREDIENTS,
	TConstructorIngredientsAction,
	DELETE_ALL_CONSTRUCTOR_INGREDIENTS,
} from './actions';

export const initialState: TIngredientsConstructorState = {
	bun: null,
	itemsConstructor: [],
};

export const constructorIngredientsReducer = (
	state = initialState,
	action: TConstructorIngredientsAction
): TIngredientsConstructorState => {
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
		case DELETE_ALL_CONSTRUCTOR_INGREDIENTS:
			return {
				...state,
				bun: null,
				itemsConstructor: [],
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
