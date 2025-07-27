import { describe, it, expect } from 'vitest';
import { orderReducer, initialState } from './reducer';
import * as types from './actions';

const order = {
	success: true,
	name: 'Краторный био-марсианский бургер',
	order: {
		ingredients: [
			{
				_id: '643d69a5c3f7b9001cfa093c',
				name: 'Краторная булка N-200i',
				type: 'bun',
				proteins: 80,
				fat: 24,
				carbohydrates: 53,
				calories: 420,
				price: 1255,
				image: 'https://code.s3.yandex.net/react/code/bun-02.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
				__v: 0,
			},
			{
				_id: '643d69a5c3f7b9001cfa0941',
				name: 'Биокотлета из марсианской Магнолии',
				type: 'main',
				proteins: 420,
				fat: 142,
				carbohydrates: 242,
				calories: 4242,
				price: 424,
				image: 'https://code.s3.yandex.net/react/code/meat-01.png',
				image_mobile:
					'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
				__v: 0,
			},
			{
				_id: '643d69a5c3f7b9001cfa093c',
				name: 'Краторная булка N-200i',
				type: 'bun',
				proteins: 80,
				fat: 24,
				carbohydrates: 53,
				calories: 420,
				price: 1255,
				image: 'https://code.s3.yandex.net/react/code/bun-02.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
				__v: 0,
			},
		],
		_id: '6884cf8cd5ca30001cffc214',
		owner: {
			name: 'Виктория ',
			email: 'vbnaish@yandex.ru',
			createdAt: '2025-06-14T13:44:29.018Z',
			updatedAt: '2025-07-02T18:01:34.132Z',
		},
		status: 'done',
		name: 'Краторный био-марсианский бургер',
		createdAt: '2025-07-26T12:52:28.677Z',
		updatedAt: '2025-07-26T12:52:29.576Z',
		number: 85124,
		price: 2934,
	},
};

const orderByNumber = {
	_id: '684d7d34c2f30c001cb2c851',
	ingredients: [
		'643d69a5c3f7b9001cfa093d',
		'643d69a5c3f7b9001cfa0941',
		'643d69a5c3f7b9001cfa0940',
		'643d69a5c3f7b9001cfa093d',
	],
	owner: '684d7cbdc2f30c001cb2c84b',
	status: 'done',
	name: 'Флюоресцентный био-марсианский метеоритный бургер',
	createdAt: '2025-06-14T13:46:28.755Z',
	updatedAt: '2025-06-14T13:46:29.535Z',
	number: 81398,
	__v: 0,
};

describe('order reducer', () => {
	it('should return the initial state', () => {
		const state = orderReducer(undefined, { type: '' });

		expect(state).toEqual(initialState);
	});

	it('should handle ORDER_LOADING', () => {
		const action = {
			type: types.ORDER_LOADING,
		};

		const state = orderReducer(initialState, action);

		expect(state).toEqual({ ...initialState, loading: true });
	});

	it('should handle ORDER_ERROR', () => {
		const prevState = { ...initialState, loading: true };

		const action = {
			type: types.ORDER_ERROR,
			payload: 'Server error',
		};

		const state = orderReducer(prevState, action);

		expect(state).toEqual({
			...initialState,
			error: 'Server error',
			loading: false,
		});
	});

	it('should handle ORDER_LOAD_SUCCESS', () => {
		const prevState = { ...initialState, loading: true };

		const action = {
			type: types.ORDER_LOAD_SUCCESS,
			payload: order,
		};

		const state = orderReducer(prevState, action);

		expect(state).toEqual({
			...initialState,
			orderId: order,
			loading: false,
		});
	});

	it('should handle ORDER_BY_NUMBER', () => {
		const prevState = { ...initialState, loading: true };

		const action = {
			type: types.ORDER_BY_NUMBER,
			payload: orderByNumber,
		};

		const state = orderReducer(prevState, action);

		expect(state).toEqual({
			...initialState,
			order: orderByNumber,
			loading: false,
		});
	});
});
