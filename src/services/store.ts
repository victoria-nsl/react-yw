import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients/reducer';
import { constructorIngredientsReducer } from './ingrediens-constructor/reducers';
import { orderReducer } from './order/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/reducers';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	constructorIngredients: constructorIngredientsReducer,
	order: orderReducer,
	auth: authReducer,
});

export const store = configureStore({ reducer: rootReducer });
