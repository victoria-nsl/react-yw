import { TOrder } from '@/utils/types';
import { createAppSelector, TRootState } from '../store';

export const getOrderFeed = (state: TRootState) => state.wsOrderFeed;

export const getOrderFeedInfo = (state: TRootState) =>
	state.wsOrderFeed.messages;

export const getOrders = createAppSelector(
	[(state) => state.wsOrderFeed.messages.orders],
	(orders: TOrder[]) => {
		return orders.filter(
			(order) =>
				Object.values(order).every(
					(item) => item !== null && item !== undefined
				) &&
				order.ingredients.every((item) => item !== null && item !== undefined)
		);
	}
);
