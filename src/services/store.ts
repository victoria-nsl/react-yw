import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { ingredientsReducer } from './ingredients/reducer';
import { currentIngredientReducer } from './current-ingredient/reducer';
import { constructorIngredientsReducer } from './ingrediens-constructor/reducers';
import { orderReducer } from './order/reducer';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	currentIngredient: currentIngredientReducer,
	constructorIngredients: constructorIngredientsReducer,
	order: orderReducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const configureStore = (initialState?: any) => {
	return createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunk))
	);
};
