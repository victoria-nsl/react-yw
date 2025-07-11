import { addOrder } from '@/utils/api';
import { AppThunk } from '../store';

export const ORDER_LOAD_SUCCESS = 'ORDER_LOAD_SUCCESS' as const;
export const ORDER_LOADING = 'ORDER_LOADING' as const;
export const ORDER_ERROR = 'ORDER_ERROR' as const;

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

export type TOrdersAction =
	| ILoadSuccessOrdersAction
	| IErrorOrdersAction
	| ILoadingOrdersAction;

export const createOrder =
	(ids: string[]): AppThunk =>
	(dispatch) => {
		dispatch({
			type: ORDER_LOADING,
		});
		return addOrder(ids)
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
