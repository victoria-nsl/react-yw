import { socketMiddleware } from '../socket-middleware';
import {
	WS_ORDER_FEED_CONNECT,
	WS_ORDER_FEED_DISCONNECT,
	WS_ORDER_FEED_ERROR,
	WS_ORDER_FEED_GET_MESSAGE,
} from './actions';

export const orderFeedMiddleware = socketMiddleware({
	connect: WS_ORDER_FEED_CONNECT,
	disconnect: WS_ORDER_FEED_DISCONNECT,
	onError: WS_ORDER_FEED_ERROR,
	onMessage: WS_ORDER_FEED_GET_MESSAGE,
});
