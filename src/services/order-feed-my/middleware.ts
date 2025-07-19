import { socketMiddleware } from '../socket-middleware';
import {
	WS_ORDER_FEED_MY_CONNECT,
	WS_ORDER_FEED_MY_DISCONNECT,
	WS_ORDER_FEED_MY_ERROR,
	WS_ORDER_FEED_MY_GET_MESSAGE,
} from './actions';

export const orderFeedMyMiddleware = socketMiddleware(
	{
		connect: WS_ORDER_FEED_MY_CONNECT,
		disconnect: WS_ORDER_FEED_MY_DISCONNECT,
		onError: WS_ORDER_FEED_MY_ERROR,
		onMessage: WS_ORDER_FEED_MY_GET_MESSAGE,
	},
	true
);
