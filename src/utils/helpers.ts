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
			_id: '687279bc5a54df001b6ddee6',
			ingredients: [
				'643d69a5c3f7b9001cfa093d',
				'643d69a5c3f7b9001cfa0941',
				'643d69a5c3f7b9001cfa0941',
				'643d69a5c3f7b9001cfa0941',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa0940',
				'643d69a5c3f7b9001cfa093d',
			],
			owner: '684d7cbdc2f30c001cb2c84b',
			status: 'done',
			name: 'Био-марсианский флюоресцентный люминесцентный метеоритный бургер',
			createdAt: '2025-07-12T15:05:32.638Z',
			updatedAt: '2025-07-12T15:05:33.402Z',
			number: 84171,
			__v: 0,
		},
		{
			_id: '68727a3e5a54df001b6ddee9',
			ingredients: [
				'643d69a5c3f7b9001cfa093c',
				'643d69a5c3f7b9001cfa0941',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa093c',
			],
			owner: '684d7cbdc2f30c001cb2c84b',
			status: 'done',
			name: 'Краторный био-марсианский люминесцентный бургер',
			createdAt: '2025-07-12T15:07:42.195Z',
			updatedAt: '2025-07-12T15:07:42.941Z',
			number: 84174,
			__v: 0,
		},
		{
			_id: '68727a7f5a54df001b6ddeea',
			ingredients: [
				'643d69a5c3f7b9001cfa093c',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa093f',
				'643d69a5c3f7b9001cfa0940',
				'643d69a5c3f7b9001cfa093c',
			],
			owner: '684d7cbdc2f30c001cb2c84b',
			status: 'done',
			name: 'Краторный бессмертный люминесцентный метеоритный бургер',
			createdAt: '2025-07-12T15:08:47.494Z',
			updatedAt: '2025-07-12T15:08:48.230Z',
			number: 84175,
			__v: 0,
		},
	],
	total: 19981,
	totalToday: 7835,
};
