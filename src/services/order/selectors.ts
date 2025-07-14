import { TRootState } from '../store';

export const getOrderInfo = (state: TRootState) => state.order;

export const getOrder = (state: TRootState) => state.order.order;
