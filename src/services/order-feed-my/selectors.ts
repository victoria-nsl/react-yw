import { TOrderFeedInfo, TWsOrderFeedState } from '@/utils/types';

export type TOrderFeedStore = {
	wsOrderFeedMy: TWsOrderFeedState;
};

export const getOrderFeedMy = (state: TOrderFeedStore): TWsOrderFeedState =>
	state.wsOrderFeedMy;

export const getOrderFeedMyInfo = (state: TOrderFeedStore): TOrderFeedInfo =>
	state.wsOrderFeedMy.messages;
