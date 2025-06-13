import { SET_USER, SET_IS_AUTH_CHECKED, TAuthAction } from './actions';

const initialState = {
	user: null,
	isAuthChecked: false,
};

export const authReducer = (state = initialState, action: TAuthAction) => {
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
