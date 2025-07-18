import { TIngredient, TOrder, TStatusOrderKeys } from '@/utils/types';
import { createAppSelector, TRootState } from '../store';

export const getOrderFeed = (state: TRootState) => state.wsOrderFeed;

export const getOrderFeedInfo = (state: TRootState) =>
	state.wsOrderFeed.messages;

export const getOrders = createAppSelector(
	[
		(state) => state.wsOrderFeed.messages.orders,
		(state) => state.ingredients.items,
	],
	(orders: TOrder[], allIngredients: TIngredient[]) => {
		const idsAllIngredients = allIngredients.map(
			(ingredient) => ingredient._id
		);

		return orders.filter(
			(order) =>
				Object.values(order).every(
					(item) => item !== null && item !== undefined
				) &&
				order.ingredients.every(
					(item) =>
						item !== null &&
						item !== undefined &&
						idsAllIngredients.includes(item)
				)
		);
	}
);

export const getNumdersOrdersByStatus = (status: TStatusOrderKeys) =>
	createAppSelector([(state) => getOrders(state)], (orders: TOrder[]) => {
		return orders
			.filter((order) => order.status === status)
			.map((order) => order.number)
			.slice(0, 14);
	});
