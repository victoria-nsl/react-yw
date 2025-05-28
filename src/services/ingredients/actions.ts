import { getIngredients } from '@/utils/api';
import { TIngredient } from '@/utils/types';

export const INGREDIENTS_LOAD_SUCCESS = 'INGREDIENTS_LOAD_SUCCESS';
export const INGREDIENTS_LOADING = 'INGREDIENTS_LOADING';
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR';

export type TIngredientsAction =
	| {
			type: 'INGREDIENTS_LOAD_SUCCESS';
			payload?: TIngredient[];
	  }
	| {
			type: 'INGREDIENTS_ERROR';
			payload?: string;
	  }
	| {
			type: 'INGREDIENTS_LOADING';
	  };

export const loadIngredients =
	() => (dispatch: (arg0: TIngredientsAction) => void) => {
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
