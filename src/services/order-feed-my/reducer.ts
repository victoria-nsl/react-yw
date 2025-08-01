import { TWsOrderFeedState } from '@/utils/types';
import {
	WS_ORDER_FEED_MY_ERROR,
	WS_ORDER_FEED_MY_GET_MESSAGE,
	TOrderFeedMyAction,
} from './actions';

export const initialState: TWsOrderFeedState = {
	messages: {
		success: false,
		orders: [],
		total: 0,
		totalToday: 0,
	},
	error: null,
};

export const wsOrderFeedMyReducer = (
	state = initialState,
	action: TOrderFeedMyAction
): TWsOrderFeedState => {
	switch (action.type) {
		case WS_ORDER_FEED_MY_ERROR:
			return {
				...state,
				error: action.payload,
			};

		case WS_ORDER_FEED_MY_GET_MESSAGE:
			return {
				...state,
				error: null,
				messages: action.payload,
			};
		default:
			return state;
	}
};
