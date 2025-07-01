import { addOrder } from '@/utils/api';
import { Dispatch } from 'redux';

export const ORDER_LOAD_SUCCESS = 'ORDER_LOAD_SUCCESS';
export const ORDER_LOADING = 'ORDER_LOADING';
export const ORDER_ERROR = 'ORDER_ERROR';

export type TOrdersAction =
	| {
			type: 'ORDER_LOAD_SUCCESS';
			payload: number;
	  }
	| {
			type: 'ORDER_ERROR';
			payload: string;
	  }
	| {
			type: 'ORDER_LOADING';
	  };

export const createOrder =
	(ids: string[]) => (dispatch: Dispatch<TOrdersAction>) => {
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
