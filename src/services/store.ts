import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { ingredientsReducer } from './ingredients/reducer';
import { currentIngredientReducer } from './current-ingredient/reducer';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	currentIngredient: currentIngredientReducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const configureStore = (initialState?: any) => {
	return createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunk))
	);
};
