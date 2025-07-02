import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients/reducer';
import { constructorIngredientsReducer } from './ingrediens-constructor/reducers';
import { orderReducer } from './order/reducer';
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { authReducer } from './auth/reducers';
import { useDispatch as dispatchHook } from 'react-redux';
import { TIngredientsAction } from './ingredients/actions';
import { TConstructorIngredientsAction } from './ingrediens-constructor/actions';
import { TOrdersAction } from './order/actions';
import { TAuthAction } from './auth/actions';
import * as appApi from '../utils/api';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	constructorIngredients: constructorIngredientsReducer,
	order: orderReducer,
	auth: authReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });

export type TAppActions =
	| TAuthAction
	| TIngredientsAction
	| TConstructorIngredientsAction
	| TOrdersAction;

type TAppDispatch = ThunkDispatch<
	TRootState,
	{ appApi: typeof appApi },
	TAppActions
>;

export const useDispatch = dispatchHook.withTypes<TAppDispatch>();
