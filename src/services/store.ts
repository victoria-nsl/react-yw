import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients/reducer';
import { currentIngredientReducer } from './current-ingredient/reducer';
import { constructorIngredientsReducer } from './ingrediens-constructor/reducers';
import { orderReducer } from './order/reducer';
import { configureStore } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	currentIngredient: currentIngredientReducer,
	constructorIngredients: constructorIngredientsReducer,
	order: orderReducer,
});

export const store = configureStore({ reducer: rootReducer });
