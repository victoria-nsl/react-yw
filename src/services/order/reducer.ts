import { TOrderState } from '@/utils/types';
import {
	ORDER_LOAD_SUCCESS,
	ORDER_LOADING,
	ORDER_ERROR,
	ORDER_BY_NUMBER,
	TOrdersAction,
} from './actions';

const initialState: TOrderState = {
	orderId: null,
	loading: false,
	error: null,
	order: null,
};

export const orderReducer = (
	state = initialState,
	action: TOrdersAction
): TOrderState => {
	switch (action.type) {
		case ORDER_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};
		case ORDER_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case ORDER_LOAD_SUCCESS:
			return {
				...state,
				orderId: action.payload!,
				loading: false,
			};
		case ORDER_BY_NUMBER:
			return {
				...state,
				order: action.payload!,
			};
		default:
			return state;
	}
};
