import {
	LOGOUT_USER,
	SET_USER,
	SET_IS_AUTH_CHECKED,
	TAuthAction,
} from './actions';

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
				isAuthChecked: true,
			};
		case SET_IS_AUTH_CHECKED:
			return {
				...state,
				isAuthChecked: true,
			};
		case LOGOUT_USER:
			return {
				...state,
				user: null,
				isAuthChecked: false,
			};

		default:
			return state;
	}
};
