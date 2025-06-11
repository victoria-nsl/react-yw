import { LOGIN, LOGOUT, REGISTER, CHECK_AUTH, TAuthAction } from './actions';

const initialState = {
	user: {
		email: '',
		name: '',
	},
	isAuthChecked: false,
};

export const authReducer = (state = initialState, action: TAuthAction) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				user: action.payload,
				isAuthChecked: true,
			};
		case REGISTER:
			return {
				...state,
				user: action.payload,
				isAuthChecked: true,
			};
		case CHECK_AUTH:
			return {
				...state,
				user: action.payload,
				isAuthChecked: true,
			};
		case LOGOUT:
			return {
				...state,
				user: {
					email: '',
					name: '',
				},
				isAuthChecked: false,
			};
		default:
			return state;
	}
};
