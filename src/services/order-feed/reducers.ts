import { TWsOrderFeedState, WebsocketStatus } from '@/utils/types';
import {
	WS_ORDER_FEED_CONNECTING,
	WS_ORDER_FEED_OPEN,
	WS_ORDER_FEED_CLOSE,
	WS_ORDER_FEED_ERROR,
	WS_ORDER_FEED_GET_MESSAGE,
	TOrderFeedAction,
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

export const wsOrderFeedReducer = (
	state = initialState,
	action: TOrderFeedAction
): TWsOrderFeedState => {
	switch (action.type) {
		case WS_ORDER_FEED_CONNECTING:
			return {
				...state,
				error: null,
				status: WebsocketStatus.CONNECTING,
			};

		case WS_ORDER_FEED_OPEN:
			return {
				...state,
				error: null,
				status: WebsocketStatus.ONLINE,
			};

		case WS_ORDER_FEED_CLOSE:
			return {
				...state,
				error: null,
				status: WebsocketStatus.OFFLINE,
			};

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
