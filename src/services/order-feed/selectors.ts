import { TRootState } from '../store';

export const getOrderFeed = (state: TRootState) => state.wsOrderFeed;

export const getOrderFeedInfo = (state: TRootState) =>
	state.wsOrderFeed.messages;

export const getOrders = (state: TRootState) =>
	state.wsOrderFeed.messages.orders;
