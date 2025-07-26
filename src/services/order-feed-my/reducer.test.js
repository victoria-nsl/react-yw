import { describe, it, expect } from 'vitest';
import { wsOrderFeedMyReducer, initialState } from './reducer';
import * as types from './actions';

const orderFeedMy = {
	success: true,
	orders: [
		{
			_id: '6884e8ced5ca30001cffc230',
			ingredients: [
				'643d69a5c3f7b9001cfa093d',
				'643d69a5c3f7b9001cfa0940',
				'643d69a5c3f7b9001cfa093d',
			],
			status: 'done',
			name: 'Флюоресцентный метеоритный бургер',
			createdAt: '2025-07-26T14:40:14.730Z',
			updatedAt: '2025-07-26T14:40:15.829Z',
			number: 85127,
		},
		{
			_id: '6884e961d5ca30001cffc233',
			ingredients: [
				'643d69a5c3f7b9001cfa093c',
				'643d69a5c3f7b9001cfa0946',
				'643d69a5c3f7b9001cfa0947',
				'643d69a5c3f7b9001cfa093c',
			],
			status: 'done',
			name: 'Краторный минеральный фалленианский бургер',
			createdAt: '2025-07-26T14:42:41.613Z',
			updatedAt: '2025-07-26T14:42:42.430Z',
			number: 85129,
		},
	],
	total: 84755,
	totalToday: 28,
};

describe('order-feed-my reducer', () => {
	it('correct initialization', () => {
		const state = wsOrderFeedMyReducer(undefined, { type: '' });

		expect(state).toEqual(initialState);
	});

	it('error loading order feed', () => {
		const action = {
			type: types.WS_ORDER_FEED_MY_ERROR,
			payload: 'Server error',
		};

		const state = wsOrderFeedMyReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			error: 'Server error',
		});
	});

	it('get order feed', () => {
		const action = {
			type: types.WS_ORDER_FEED_MY_GET_MESSAGE,
			payload: orderFeedMy,
		};

		const state = wsOrderFeedMyReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			messages: orderFeedMy,
		});
	});
});
