import { TOrderState } from '@/utils/types';

export type TOrderStore = {
	order: TOrderState;
};

export const getOrder = (state: TOrderStore): TOrderState => state.order;
