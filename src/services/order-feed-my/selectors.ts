import { TOrder } from '@/utils/types';
import { createAppSelector, TRootState } from '../store';

export const getOrderFeedMy = (state: TRootState) => state.wsOrderFeedMy;

export const getOrdersMy = createAppSelector(
	[(state) => state.wsOrderFeedMy.messages.orders],
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
