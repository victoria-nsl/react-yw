import { TOrder, TStatusOrderKeys, TStatusOrderValues } from './types';

const KEY_ESCAPE = 'Escape';
const KEY_ESC = 'Esc';

export const isEscEvent = (evt: KeyboardEvent): boolean =>
	evt.key === KEY_ESCAPE || evt.key === KEY_ESC;

export const getNameStatus = (status: TStatusOrderKeys): TStatusOrderValues => {
	switch (status) {
		case 'created':
			return 'Создан';
		case 'pending':
			return 'Готовится';
		case 'done':
			return 'Выполнен';
	}
};

//Временно, пока нет реальных данных
export const orders: Array<TOrder> = [
	{
		createdAt: '2025-07-05T08:06:51.037Z',
		number: 83691,
		name: 'Флюоресцентный антарианский space астероидный фалленианский экзо-плантаго традиционный-галактический люминесцентный бургер',
		_id: '686a2e9b5a54df001b6dc104',
		price: 13551,
		status: 'done',
		ingredients: [
			{
				calories: 643,
				carbohydrates: 85,
				fat: 26,
				image: 'https://code.s3.yandex.net/react/code/bun-01.png',
				image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
				name: 'Флюоресцентная булка R2-D3',
				price: 988,
				proteins: 44,
				type: 'bun',
				__v: 0,
				_id: '643d69a5c3f7b9001cfa093d',
			},
			// {
			// 	calories: 643,
			// 	carbohydrates: 85,
			// 	fat: 26,
			// 	image: 'https://code.s3.yandex.net/react/code/meat-03.png',
			// 	image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
			// 	image_mobile:
			// 		'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
			// 	name: 'Филе Люминесцентного тетраодонтимформа',
			// 	price: 988,
			// 	proteins: 44,
			// 	type: 'main',
			// 	__v: 0,
			// 	_id: '643d69a5c3f7b9001cfa093e',
			// },
			{
				calories: 643,
				carbohydrates: 85,
				fat: 26,
				image: 'https://code.s3.yandex.net/react/code/meat-03.png',
				image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
				image_mobile:
					'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
				name: 'Филе Люминесцентного тетраодонтимформа',
				price: 988,
				proteins: 44,
				type: 'main',
				__v: 0,
				_id: '643d69a5c3f7b9001cfa093e',
			},

			{
				calories: 77,
				carbohydrates: 55,
				fat: 5,
				image: 'https://code.s3.yandex.net/react/code/sp_1.png',
				image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
				name: 'Плоды Фалленианского дерева',
				price: 874,
				proteins: 20,
				type: 'main',
				__v: 0,
				_id: '643d69a5c3f7b9001cfa0947',
			},

			{
				calories: 6,
				carbohydrates: 3,
				fat: 2,
				image: 'https://code.s3.yandex.net/react/code/salad.png',
				image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
				name: 'Мини-салат Экзо-Плантаго',
				price: 4400,
				proteins: 1,
				type: 'main',
				__v: 0,
				_id: '643d69a5c3f7b9001cfa0949',
			},

			{
				calories: 14,
				carbohydrates: 11,
				fat: 22,
				image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
				image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
				image_mobile:
					'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
				name: 'Соус фирменный Space Sauce',
				price: 80,
				proteins: 50,
				type: 'sauce',
				__v: 0,
				_id: '643d69a5c3f7b9001cfa0943',
			},

			{
				calories: 100,
				carbohydrates: 100,
				fat: 99,
				image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
				image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
				image_mobile:
					'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
				name: 'Соус с шипами Антарианского плоскоходца',
				price: 88,
				proteins: 101,
				type: 'sauce',
				__v: 0,
				_id: '643d69a5c3f7b9001cfa0945',
			},

			{
				calories: 99,
				carbohydrates: 42,
				fat: 24,
				image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
				image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
				image_mobile:
					'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
				name: 'Соус традиционный галактический',
				price: 15,
				proteins: 42,
				type: 'sauce',
				__v: 0,
				_id: '643d69a5c3f7b9001cfa0944',
			},

			{
				calories: 3377,
				carbohydrates: 420,
				fat: 48,
				image: 'https://code.s3.yandex.net/react/code/cheese.png',
				image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
				name: 'Сыр с астероидной плесенью',
				price: 4142,
				proteins: 84,
				type: 'main',
				__v: 0,
				_id: '643d69a5c3f7b9001cfa094a',
			},
		],
	},

	{
		createdAt: '2025-07-08T08:06:51.037Z',
		number: 83700,
		name: 'Флюоресцентный фалленианский экзо-плантаго галактический люминесцентный бургер',
		_id: '686a2e9b5a54df001b6dc106',
		price: 12000,
		status: 'pending',
		ingredients: [
			{
				calories: 643,
				carbohydrates: 85,
				fat: 26,
				image: 'https://code.s3.yandex.net/react/code/bun-01.png',
				image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
				name: 'Флюоресцентная булка R2-D3',
				price: 988,
				proteins: 44,
				type: 'bun',
				__v: 0,
				_id: '643d69a5c3f7b9001cfa093d',
			},

			{
				calories: 3377,
				carbohydrates: 420,
				fat: 48,
				image: 'https://code.s3.yandex.net/react/code/cheese.png',
				image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
				name: 'Сыр с астероидной плесенью',
				price: 4142,
				proteins: 84,
				type: 'main',
				__v: 0,
				_id: '643d69a5c3f7b9001cfa094a',
			},
		],
	},

	{
		createdAt: '2025-07-01T08:06:51.037Z',
		number: 83701,
		name: 'Флюоресцентный фаллениаbnnbnbbнский экзо-плантаго галактический люминесцентный бургер',
		_id: '686a2e9b5a54df001b6dc109',
		price: 9000,
		status: 'created',
		ingredients: [
			{
				calories: 643,
				carbohydrates: 85,
				fat: 26,
				image: 'https://code.s3.yandex.net/react/code/bun-01.png',
				image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
				name: 'Флюоресцентная булка R2-D3',
				price: 988,
				proteins: 44,
				type: 'bun',
				__v: 0,
				_id: '643d69a5c3f7b9001cfa093d',
			},

			{
				calories: 3377,
				carbohydrates: 420,
				fat: 48,
				image: 'https://code.s3.yandex.net/react/code/cheese.png',
				image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
				name: 'Сыр с астероидной плесенью',
				price: 4142,
				proteins: 84,
				type: 'main',
				__v: 0,
				_id: '643d69a5c3f7b9001cfa094a',
			},
		],
	},
];

export const ordersDone = [
	83691, 83692, 83693, 83694, 83695, 83696, 83697, 83698, 83699, 83700, 83701,
	83702, 83703, 83704, 83705, 83706, 83707, 83708, 83709, 83710,
];

export const ordersPending = [
	83711, 83712, 83713, 83714, 83715, 83716, 83717, 83718, 83719,
];
