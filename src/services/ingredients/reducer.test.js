import { describe, it, expect } from 'vitest';
import { ingredientsReducer, initialState } from './reducer';
import * as types from './actions';

const ingredients = [
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
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
		__v: 0,
	},

	{
		_id: '643d69a5c3f7b9001cfa0944',
		name: 'Соус традиционный галактический',
		type: 'sauce',
		proteins: 42,
		fat: 24,
		carbohydrates: 42,
		calories: 99,
		price: 15,
		image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
		__v: 0,
	},
];

describe('ingredients reducer', () => {
	it('correct initialization', () => {
		const state = ingredientsReducer(undefined, { type: '' });

		expect(state).toEqual(initialState);
	});

	it('loading ingredients', () => {
		const action = {
			type: types.INGREDIENTS_LOADING,
		};

		const state = ingredientsReducer(initialState, action);

		expect(state).toEqual({ ...initialState, loading: true });
	});

	it('error loading ingredients', () => {
		const prevState = { ...initialState, loading: true };

		const action = {
			type: types.INGREDIENTS_ERROR,
			payload: 'Server error',
		};

		const state = ingredientsReducer(prevState, action);

		expect(state).toEqual({
			...initialState,
			error: 'Server error',
			loading: false,
		});
	});

	it('load success ingredients', () => {
		const prevState = { ...initialState, loading: true };

		const action = {
			type: types.INGREDIENTS_LOAD_SUCCESS,
			payload: ingredients,
		};

		const state = ingredientsReducer(prevState, action);

		expect(state).toEqual({
			...initialState,
			items: ingredients,
			loading: false,
		});
	});
});
