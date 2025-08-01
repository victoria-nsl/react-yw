import { combineReducers } from 'redux';
import { configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';
import { createSelector } from 'reselect';

import { TIngredientsAction } from './ingredients/actions';
import { TConstructorIngredientsAction } from './ingrediens-constructor/actions';
import { TOrdersAction } from './order/actions';
import { TAuthAction } from './auth/actions';
import { TOrderFeedMyAction } from './order-feed-my/actions';
import { TOrderFeedAction } from './order-feed/actions';
import { wsOrderFeedReducer } from './order-feed/reducer';
import { ingredientsReducer } from './ingredients/reducer';
import { orderReducer } from './order/reducer';
import { wsOrderFeedMyReducer } from './order-feed-my/reducer';
import { constructorIngredientsReducer } from './ingrediens-constructor/reducer';
import { authReducer } from './auth/reducer';
import { orderFeedMyMiddleware } from './order-feed-my/middleware';
import { orderFeedMiddleware } from './order-feed/middleware';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	constructorIngredients: constructorIngredientsReducer,
	order: orderReducer,
	wsOrderFeed: wsOrderFeedReducer,
	wsOrderFeedMy: wsOrderFeedMyReducer,
	auth: authReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export type TAppActions =
	| TAuthAction
	| TIngredientsAction
	| TConstructorIngredientsAction
	| TOrdersAction
	| TOrderFeedAction
	| TOrderFeedMyAction;

export type TAppDispatch = ThunkDispatch<TRootState, unknown, TAppActions>;

export type AppThunk<TReturn = void> = ThunkAction<
	TReturn,
	TRootState,
	unknown,
	TAppActions
>;

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([orderFeedMiddleware, orderFeedMyMiddleware]),
});

export const useSelector = selectorHook.withTypes<TRootState>();

export const useDispatch = dispatchHook.withTypes<TAppDispatch>();

export const createAppSelector = createSelector.withTypes<TRootState>();
