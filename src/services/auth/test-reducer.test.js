import { describe, it, expect } from 'vitest';
import { authReducer, initialState } from './reducer';
import * as types from './actions';

const user = {
	success: true,
	user: {
		email: 'vvvv@yandex.ru',
		name: 'Виктория',
	},
	accessToken:
		'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODRlMWMzZDVjYTMwMDAxY2ZmYzIyOSIsImlhdCI6MTc1MzUzOTAxMSwiZXhwIjoxNzUzNTQwMjExfQ.h81Xg61baAF1nsxhbCR0mB5dUZ-ykGmFbecNfLVFqbU',
	refreshToken:
		'b547aa570156668e314abfd52de25fb1e3bd757715edf82615f1763625246a4bd50df40bfeabc831',
};

describe('auth reducer', () => {
	it('should return the initial state', () => {
		const state = authReducer(undefined, { type: '' });

		expect(state).toEqual(initialState);
	});

	it('should handle SET_USER', () => {
		const action = {
			type: types.SET_USER,
			payload: user,
		};

		const state = authReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			user,
		});
	});

	it('should handle SET_IS_AUTH_CHECKED', () => {
		const action = {
			type: types.SET_IS_AUTH_CHECKED,
			payload: true,
		};

		const state = authReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			isAuthChecked: true,
		});
	});
});
