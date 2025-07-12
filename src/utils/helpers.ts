import { TStatusOrderKeys, TStatusOrderValues } from './types';

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
export const ordersTest = {
	success: true,
	orders: [
		{
			ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
			name: 'Флюоресцентный антарианский space астероидный фалленианский экзо-плантаго традиционный-галактический люминесцентный бургер',
			_id: '',
			status: 'done',
			number: 83691,
			createdAt: '2025-06-23T20:11:01.403Z',
			updatedAt: '2025-05-23T20:11:01.406Z',
		},
		{
			ingredients: [
				'643d69a5c3f7b9001cfa093d',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa0947',
				'643d69a5c3f7b9001cfa0949',
				'643d69a5c3f7b9001cfa0943',
				'643d69a5c3f7b9001cfa0945',
				'643d69a5c3f7b9001cfa0944',
				'643d69a5c3f7b9001cfa094a',
				'643d69a5c3f7b9001cfa093d',
			],
			name: 'Флюоресцентный антарианский space астероидный фалленианский экзо-плантаго традиционный-галактический люминесцентный бургер',
			_id: '',
			status: 'done',
			number: 83700,
			createdAt: '2025-04-23T20:13:23.654Z',
			updatedAt: '2025-06-23T20:13:23.657Z',
		},
		{
			ingredients: [
				'643d69a5c3f7b9001cfa093d',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa0944',
				'643d69a5c3f7b9001cfa094a',
				'643d69a5c3f7b9001cfa093d',
			],
			name: 'Флюоресцентный экзо-плантаго традиционный-галактический люминесцентный бургер',
			_id: '',
			status: 'pending',
			number: 83701,
			createdAt: '2025-07-12T20:13:23.654Z',
			updatedAt: '2025-07-12T20:13:23.657Z',
		},
	],
	total: 1380,
	totalToday: 25,
};

// export const ordersDone = [
// 	83691, 83692, 83693, 83694, 83695, 83696, 83697, 83698, 83699, 83700, 83701,
// 	83702, 83703, 83704, 83705, 83706, 83707, 83708, 83709, 83710,
// ];

// export const ordersPending = [
// 	83711, 83712, 83713, 83714, 83715, 83716, 83717, 83718, 83719,
// ];
