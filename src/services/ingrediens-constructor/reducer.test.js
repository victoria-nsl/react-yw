import { describe, it, expect } from 'vitest';
import { constructorIngredientsReducer, initialState } from './reducer';
import * as types from './actions';

const ingredientBun = {
	_id: '643d69a5c3f7b9001cfa093d',
	name: 'Флюоресцентная булка R2-D3',
	type: 'bun',
	proteins: 44,
	fat: 26,
	carbohydrates: 85,
	calories: 643,
	price: 988,
	image: 'https://code.s3.yandex.net/react/code/bun-01.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
	__v: 0,
	id: '14a234d4-48f4-49d4-adc8-6f6266a5399c',
};

const ingredient = {
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
	id: '9da2c2fa-1d97-4afa-84cd-6ee2e2ce4646',
};

const ingredientsStart = [
	{
		_id: '643d69a5c3f7b9001cfa0946',
		name: 'Хрустящие минеральные кольца',
		type: 'main',
		proteins: 808,
		fat: 689,
		carbohydrates: 609,
		calories: 986,
		price: 300,
		image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
		image_mobile:
			'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
		image_large:
			'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
		__v: 0,
		id: 'bd725889-fe2e-4e91-9fd3-497bcb28042c',
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
		id: '92a504cd-447f-4620-bf35-c9e2d2d2a238',
	},
];

const ingredientsEnd = [
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
		id: '92a504cd-447f-4620-bf35-c9e2d2d2a238',
	},
	{
		_id: '643d69a5c3f7b9001cfa0946',
		name: 'Хрустящие минеральные кольца',
		type: 'main',
		proteins: 808,
		fat: 689,
		carbohydrates: 609,
		calories: 986,
		price: 300,
		image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
		image_mobile:
			'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
		image_large:
			'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
		__v: 0,
		id: 'bd725889-fe2e-4e91-9fd3-497bcb28042c',
	},
];

describe('ingredients-constructor reducer', () => {
	it('correct initialization', () => {
		const state = constructorIngredientsReducer(undefined, { type: '' });

		expect(state).toEqual(initialState);
	});

	it('adding ingredient(bun) to the constructor', () => {
		const action = {
			type: types.ADD_CONSTRUCTOR_INGREDIENTS,
			payload: ingredientBun,
		};

		const state = constructorIngredientsReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			bun: ingredientBun,
		});
	});

	it('adding ingredient(not bun) to the constructor', () => {
		const prevState = { ...initialState, bun: ingredientBun };

		const action = {
			type: types.ADD_CONSTRUCTOR_INGREDIENTS,
			payload: ingredient,
		};

		const state = constructorIngredientsReducer(prevState, action);

		expect(state).toEqual({
			...initialState,
			bun: ingredientBun,
			itemsConstructor: [ingredient],
		});
	});

	it('removing ingredient(bun) from constructor', () => {
		const prevState = {
			...initialState,
			bun: ingredientBun,
			itemsConstructor: [ingredient],
		};

		const action = {
			type: types.DELETE_CONSTRUCTOR_INGREDIENTS,
			payload: ingredient,
		};

		const state = constructorIngredientsReducer(prevState, action);

		expect(state).toEqual({
			...initialState,
			bun: ingredientBun,
			itemsConstructor: [],
		});
	});

	it('removing all ingredients from constructor', () => {
		const prevState = {
			...initialState,
			bun: ingredientBun,
			itemsConstructor: [ingredient],
		};

		const action = {
			type: types.DELETE_ALL_CONSTRUCTOR_INGREDIENTS,
		};

		const state = constructorIngredientsReducer(prevState, action);

		expect(state).toEqual({
			...initialState,
			bun: null,
			itemsConstructor: [],
		});
	});

	it('changing the order of ingredients in the constructor', () => {
		const prevState = {
			...initialState,
			bun: ingredientBun,
			itemsConstructor: ingredientsStart,
		};

		const action = {
			type: types.UPDATE_CONSTRUCTOR_INGREDIENTS,
			payload: ingredientsEnd,
		};

		const state = constructorIngredientsReducer(prevState, action);

		expect(state).toEqual({
			...initialState,
			bun: ingredientBun,
			itemsConstructor: ingredientsEnd,
		});
	});
});
