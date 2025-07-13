import { addOrderApi, getOrderByNumberApi } from '@/utils/api';
import { AppThunk } from '../store';
import { TOrderByNumber } from '@/utils/types';

export const ORDER_LOAD_SUCCESS = 'ORDER_LOAD_SUCCESS' as const;
export const ORDER_LOADING = 'ORDER_LOADING' as const;
export const ORDER_ERROR = 'ORDER_ERROR' as const;
export const ORDER_BY_NUMBER = 'ORDER_BY_NUMBER' as const;

export interface ILoadSuccessOrdersAction {
	readonly type: typeof ORDER_LOAD_SUCCESS;
	readonly payload: number;
}

export interface IErrorOrdersAction {
	readonly type: typeof ORDER_ERROR;
	readonly payload: string;
}
export interface ILoadingOrdersAction {
	readonly type: typeof ORDER_LOADING;
}

export interface IOrderByNumberAction {
	readonly type: typeof ORDER_BY_NUMBER;
	readonly payload: TOrderByNumber;
}

export type TOrdersAction =
	| ILoadSuccessOrdersAction
	| IErrorOrdersAction
	| ILoadingOrdersAction
	| IOrderByNumberAction;

export const createOrder =
	(ids: string[]): AppThunk =>
	(dispatch) => {
		dispatch({
			type: ORDER_LOADING,
		});
		return addOrderApi(ids)
			.then((res) => {
				dispatch({
					type: ORDER_LOAD_SUCCESS,
					payload: res.order.number,
				});
			})
			.catch((err) => {
				dispatch({
					type: ORDER_ERROR,
					payload: err.message,
				});
			});
	};

export const getOrderByNumber =
	(numberOrder: number): AppThunk =>
	(dispatch) => {
		dispatch({
			type: ORDER_LOADING,
		});
		return getOrderByNumberApi(numberOrder)
			.then((res) => {
				dispatch({
					type: ORDER_BY_NUMBER,
					payload: res[0],
				});
			})
			.catch((err) => {
				dispatch({
					type: ORDER_ERROR,
					payload: err.message,
				});
			});
	};
