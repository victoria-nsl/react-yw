import { socketMiddleware } from '../socket-middleware';
import {
	WS_ORDER_FEED_CONNECT,
	WS_ORDER_FEED_DISCONNECT,
	WS_ORDER_FEED_CONNECTING,
	WS_ORDER_FEED_OPEN,
	WS_ORDER_FEED_CLOSE,
	WS_ORDER_FEED_ERROR,
	WS_ORDER_FEED_GET_MESSAGE,
} from './actions';

export const orderFeedMiddleware = socketMiddleware(
	{
		connect: WS_ORDER_FEED_CONNECT,
		disconnect: WS_ORDER_FEED_DISCONNECT,
		onConnecting: WS_ORDER_FEED_CONNECTING,
		onOpen: WS_ORDER_FEED_OPEN,
		onClose: WS_ORDER_FEED_CLOSE,
		onError: WS_ORDER_FEED_ERROR,
		onMessage: WS_ORDER_FEED_GET_MESSAGE,
	},
	false
);
