import { TOrderFeedInfo, TWsOrderFeedState } from '@/utils/types';

export type TOrderFeedStore = {
	wsOrderFeed: TWsOrderFeedState;
};

export const getOrderFeed = (state: TOrderFeedStore): TWsOrderFeedState =>
	state.wsOrderFeed;

export const getOrderFeedInfo = (state: TOrderFeedStore): TOrderFeedInfo =>
	state.wsOrderFeed.messages;
