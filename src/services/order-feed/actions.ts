import { TOrderFeedInfo } from '@/utils/types';

export const WS_ORDER_FEED_CONNECT = 'WS_ORDER_FEED_CONNECT';
export const WS_ORDER_FEED_DISCONNECT = 'WS_ORDER_FEED_DISCONNECT';

export const WS_ORDER_FEED_ERROR = 'WS_ORDER_FEED_ERROR';
export const WS_ORDER_FEED_GET_MESSAGE = 'WS_ORDER_FEED_GET_MESSAGE';

export interface IConnectOrderFeedAction {
	readonly type: typeof WS_ORDER_FEED_CONNECT;
	readonly payload: string;
}

export interface IDisconnectOrderFeedAction {
	readonly type: typeof WS_ORDER_FEED_DISCONNECT;
}

export interface IErrorOrderFeedAction {
	readonly type: typeof WS_ORDER_FEED_ERROR;
	readonly payload: string;
}

export interface IGetMessageOrderFeedAction {
	readonly type: typeof WS_ORDER_FEED_GET_MESSAGE;
	readonly payload: TOrderFeedInfo;
}

export type TOrderFeedAction =
	| IConnectOrderFeedAction
	| IDisconnectOrderFeedAction
	| IErrorOrderFeedAction
	| IGetMessageOrderFeedAction;

export const wsConnectOrderFeed = (url: string): IConnectOrderFeedAction => ({
	type: WS_ORDER_FEED_CONNECT,
	payload: url,
});

export const wsDisconnectOrderFeed = (): IDisconnectOrderFeedAction => ({
	type: WS_ORDER_FEED_DISCONNECT,
});
