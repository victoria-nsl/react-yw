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
