import {
	LOGIN,
	LOGOUT,
	REGISTER,
	CHECK_AUTH,
	AUTH_ERROR,
	TAuthAction,
} from './actions';

const initialState = {
	user: {
		email: '',
		name: '',
	},
	isAuthChecked: false,
	error: null,
};

export const authReducer = (state = initialState, action: TAuthAction) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				user: action.payload,
				isAuthChecked: true,
				error: null,
			};
		case REGISTER:
			return {
				...state,
				user: action.payload,
				isAuthChecked: true,
				error: null,
			};
		case CHECK_AUTH:
			return {
				...state,
				user: action.payload,
				isAuthChecked: true,
				error: null,
			};
		case LOGOUT:
			return {
				...state,
				user: {
					email: '',
					name: '',
				},
				isAuthChecked: false,
				error: null,
			};
		case AUTH_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
