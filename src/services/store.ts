import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients/reducer';
import { constructorIngredientsReducer } from './ingrediens-constructor/reducers';
import { orderReducer } from './order/reducer';
import { configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { authReducer } from './auth/reducers';
import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';
import { createSelector } from 'reselect';
import { TIngredientsAction } from './ingredients/actions';
import { TConstructorIngredientsAction } from './ingrediens-constructor/actions';
import { TOrdersAction } from './order/actions';
import { TAuthAction } from './auth/actions';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	constructorIngredients: constructorIngredientsReducer,
	order: orderReducer,
	auth: authReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export type TAppActions =
	| TAuthAction
	| TIngredientsAction
	| TConstructorIngredientsAction
	| TOrdersAction;

export type TAppDispatch = ThunkDispatch<TRootState, unknown, TAppActions>;

export type AppThunk<TReturn = void> = ThunkAction<
	TReturn,
	TRootState,
	unknown,
	TAppActions
>;

export const store = configureStore({ reducer: rootReducer });

export const useSelector = selectorHook.withTypes<TRootState>();

export const useDispatch = dispatchHook.withTypes<TAppDispatch>();

export const createAppSelector = createSelector.withTypes<TRootState>();
