import { describe, it, expect } from 'vitest';
import { wsOrderFeedReducer, initialState } from './reducer';
import * as types from './actions';

const orderFeed = {
	success: true,
	orders: [
		{
			_id: '6884d91fd5ca30001cffc223',
			ingredients: [
				'643d69a5c3f7b9001cfa093d',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa0940',
				'643d69a5c3f7b9001cfa093f',
				'643d69a5c3f7b9001cfa093d',
			],
			status: 'done',
			name: 'Метеоритный флюоресцентный люминесцентный бессмертный бургер',
			createdAt: '2025-07-26T13:33:19.631Z',
			updatedAt: '2025-07-26T13:33:20.467Z',
			number: 85126,
		},
		{
			_id: '6884d59cd5ca30001cffc21d',
			ingredients: [
				'643d69a5c3f7b9001cfa093d',
				'643d69a5c3f7b9001cfa0943',
				'643d69a5c3f7b9001cfa0942',
				'643d69a5c3f7b9001cfa0945',
			],
			status: 'done',
			name: 'Space флюоресцентный spicy антарианский бургер',
			createdAt: '2025-07-26T13:18:20.058Z',
			updatedAt: '2025-07-26T13:18:20.765Z',
			number: 85125,
		},
	],
	total: 84752,
	totalToday: 25,
};

describe('order-feed reducer', () => {
	it('should return the initial state', () => {
		const state = wsOrderFeedReducer(undefined, { type: '' });

		expect(state).toEqual(initialState);
	});

	it('should handle WS_ORDER_FEED_ERROR', () => {
		const action = {
			type: types.WS_ORDER_FEED_ERROR,
			payload: 'Server error',
		};

		const state = wsOrderFeedReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			error: 'Server error',
		});
	});

	it('should handle WS_ORDER_FEED_GET_MESSAGE', () => {
		const action = {
			type: types.WS_ORDER_FEED_GET_MESSAGE,
			payload: orderFeed,
		};

		const state = wsOrderFeedReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			messages: orderFeed,
		});
	});
});
