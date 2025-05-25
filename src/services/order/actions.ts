import { addOrder } from '@/utils/api';

export const ORDER_LOAD_SUCCESS = 'ORDER_LOAD_SUCCESS';
export const ORDER_LOADING = 'ORDER_LOADING';
export const ORDER_ERROR = 'ORDER_ERROR';

export type TOrdersAction = {
	type: string;
	payload?: number;
};

export const createOrder =
	(ids: string[]) => (dispatch: (arg0: TOrdersAction) => void) => {
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
