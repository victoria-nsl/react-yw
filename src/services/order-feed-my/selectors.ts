import { TRootState } from '../store';

export const getOrderFeedMy = (state: TRootState) => state.wsOrderFeedMy;

export const getOrderFeedMyInfo = (state: TRootState) =>
	state.wsOrderFeedMy.messages;

export const getOrdersMy = (state: TRootState) =>
	state.wsOrderFeedMy.messages.orders;
