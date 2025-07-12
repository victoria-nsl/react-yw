import { TAuthState } from '@/utils/types';
import { SET_USER, SET_IS_AUTH_CHECKED, TAuthAction } from './actions';

const initialState: TAuthState = {
	user: null,
	isAuthChecked: false,
};

export const authReducer = (
	state = initialState,
	action: TAuthAction
): TAuthState => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.payload,
			};
		case SET_IS_AUTH_CHECKED:
			return {
				...state,
				isAuthChecked: action.payload,
			};

		default:
			return state;
	}
};
