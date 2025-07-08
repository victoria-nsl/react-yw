import { getIngredients } from '@/utils/api';
import { TIngredient } from '@/utils/types';
import { TAppDispatch } from '../store';

export const INGREDIENTS_LOAD_SUCCESS = 'INGREDIENTS_LOAD_SUCCESS' as const;
export const INGREDIENTS_LOADING = 'INGREDIENTS_LOADING' as const;
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR' as const;

export interface ILoadSuccessIngredientsAction {
	readonly type: typeof INGREDIENTS_LOAD_SUCCESS;
	readonly payload: TIngredient[];
}

export interface IErrorIngredientsAction {
	readonly type: typeof INGREDIENTS_ERROR;
	readonly payload: string;
}

export interface ILoadingIngredientsAction {
	readonly type: typeof INGREDIENTS_LOADING;
}

export type TIngredientsAction =
	| ILoadSuccessIngredientsAction
	| IErrorIngredientsAction
	| ILoadingIngredientsAction;

export const loadIngredients = () => (dispatch: TAppDispatch) => {
	dispatch({
		type: INGREDIENTS_LOADING,
	});
	return getIngredients()
		.then((res) => {
			dispatch({
				type: INGREDIENTS_LOAD_SUCCESS,
				payload: res,
			});
		})
		.catch((err) => {
			dispatch({
				type: INGREDIENTS_ERROR,
				payload: err.message,
			});
		});
};
