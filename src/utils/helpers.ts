const KEY_ESCAPE = 'Escape';
const KEY_ESC = 'Esc';

export const isEscEvent = (evt: KeyboardEvent): boolean =>
	evt.key === KEY_ESCAPE || evt.key === KEY_ESC;
