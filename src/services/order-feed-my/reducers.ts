import { TWsOrderFeedState, WebsocketStatus } from '@/utils/types';
import {
	WS_ORDER_FEED_MY_CONNECTING,
	WS_ORDER_FEED_MY_OPEN,
	WS_ORDER_FEED_MY_CLOSE,
	WS_ORDER_FEED_MY_ERROR,
	WS_ORDER_FEED_MY_GET_MESSAGE,
	TOrderFeedMyAction,
} from './actions';

const initialState: TWsOrderFeedState = {
	status: WebsocketStatus.OFFLINE,
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
		case WS_ORDER_FEED_MY_CONNECTING:
			return {
				...state,
				error: null,
				status: WebsocketStatus.CONNECTING,
			};

		case WS_ORDER_FEED_MY_OPEN:
			return {
				...state,
				error: null,
				status: WebsocketStatus.ONLINE,
			};

		case WS_ORDER_FEED_MY_CLOSE:
			return {
				...state,
				error: null,
				status: WebsocketStatus.OFFLINE,
			};

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
