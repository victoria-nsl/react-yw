import { TOrderFeedInfo } from '@/utils/types';

export const WS_ORDER_FEED_MY_CONNECT = 'WS_ORDER_FEED_MY_CONNECT';
export const WS_ORDER_FEED_MY_DISCONNECT = 'WS_ORDER_FEED_MY_DISCONNECT';

export const WS_ORDER_FEED_MY_CONNECTING = 'WS_ORDER_FEED_MY_CONNECTING';
export const WS_ORDER_FEED_MY_OPEN = 'WS_ORDER_FEED_MY_OPEN';
export const WS_ORDER_FEED_MY_CLOSE = 'WS_ORDER_FEED_MY_CLOSE';
export const WS_ORDER_FEED_MY_ERROR = 'WS_ORDER_FEED_MY_ERROR';
export const WS_ORDER_FEED_MY_GET_MESSAGE = 'WS_ORDER_FEED_MY_GET_MESSAGE';

export interface IConnectOrderFeedMyAction {
	readonly type: typeof WS_ORDER_FEED_MY_CONNECT;
	readonly payload: string;
}

export interface IDisconnectOrderFeedMyAction {
	readonly type: typeof WS_ORDER_FEED_MY_DISCONNECT;
}

export interface IConnectingOrderFeedMyAction {
	readonly type: typeof WS_ORDER_FEED_MY_CONNECTING;
}

export interface IOpenOrderFeedMyAction {
	readonly type: typeof WS_ORDER_FEED_MY_OPEN;
}

export interface ICloseOrderFeedMyAction {
	readonly type: typeof WS_ORDER_FEED_MY_CLOSE;
}

export interface IErrorOrderFeedMyAction {
	readonly type: typeof WS_ORDER_FEED_MY_ERROR;
	readonly payload: string;
}

export interface IGetMessageOrderFeedMyAction {
	readonly type: typeof WS_ORDER_FEED_MY_GET_MESSAGE;
	readonly payload: TOrderFeedInfo;
}

export type TOrderFeedMyAction =
	| IConnectOrderFeedMyAction
	| IDisconnectOrderFeedMyAction
	| IConnectingOrderFeedMyAction
	| IOpenOrderFeedMyAction
	| ICloseOrderFeedMyAction
	| IErrorOrderFeedMyAction
	| IGetMessageOrderFeedMyAction;

export const wsConnectOrderFeedMy = (
	url: string
): IConnectOrderFeedMyAction => ({
	type: WS_ORDER_FEED_MY_CONNECT,
	payload: url,
});

export const wsDisconnectOrderFeedMy = (): IDisconnectOrderFeedMyAction => ({
	type: WS_ORDER_FEED_MY_DISCONNECT,
});
