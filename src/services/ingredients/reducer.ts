import {
	INGREDIENTS_LOAD_SUCCESS,
	INGREDIENTS_LOADING,
	INGREDIENTS_ERROR,
	TIngredientsAction,
} from './actions';

const initialState = {
	items: [],
	loading: false,
	error: null,
};

export const ingredientsReducer = (
	state = initialState,
	action: TIngredientsAction
) => {
	switch (action.type) {
		case INGREDIENTS_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};
		case INGREDIENTS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case INGREDIENTS_LOAD_SUCCESS:
			return {
				...state,
				items: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};
