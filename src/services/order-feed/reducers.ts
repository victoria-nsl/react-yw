import { TWsOrderFeedState } from '@/utils/types';
import {
	WS_ORDER_FEED_ERROR,
	WS_ORDER_FEED_GET_MESSAGE,
	TOrderFeedAction,
} from './actions';

const initialState: TWsOrderFeedState = {
	messages: {
		success: false,
		orders: [],
		total: 0,
		totalToday: 0,
	},
	error: null,
};

export const wsOrderFeedReducer = (
	state = initialState,
	action: TOrderFeedAction
): TWsOrderFeedState => {
	switch (action.type) {
		case WS_ORDER_FEED_ERROR:
			return {
				...state,
				error: action.payload,
			};

		case WS_ORDER_FEED_GET_MESSAGE:
			return {
				...state,
				error: null,
				messages: action.payload,
			};
		default:
			return state;
	}
};
