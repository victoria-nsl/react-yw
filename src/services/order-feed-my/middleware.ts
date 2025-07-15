import { socketMiddleware } from '../socket-middleware';
import {
	WS_ORDER_FEED_MY_CONNECT,
	WS_ORDER_FEED_MY_DISCONNECT,
	WS_ORDER_FEED_MY_CONNECTING,
	WS_ORDER_FEED_MY_OPEN,
	WS_ORDER_FEED_MY_CLOSE,
	WS_ORDER_FEED_MY_ERROR,
	WS_ORDER_FEED_MY_GET_MESSAGE,
} from './actions';

export const orderFeedMyMiddleware = socketMiddleware(
	{
		connect: WS_ORDER_FEED_MY_CONNECT,
		disconnect: WS_ORDER_FEED_MY_DISCONNECT,
		onConnecting: WS_ORDER_FEED_MY_CONNECTING,
		onOpen: WS_ORDER_FEED_MY_OPEN,
		onClose: WS_ORDER_FEED_MY_CLOSE,
		onError: WS_ORDER_FEED_MY_ERROR,
		onMessage: WS_ORDER_FEED_MY_GET_MESSAGE,
	},
	true
);
