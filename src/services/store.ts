import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { ingredientsReducer } from './ingredients/reducer';
import { thunk } from 'redux-thunk';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const configureStore = (initialState?: any) => {
	return createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunk))
	);
};
