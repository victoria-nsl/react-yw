import {
	TConstructorIngredient,
	TIngredientsConstructorState,
} from '@/utils/types';
import { createSelector } from 'reselect';

export const getAllConstructorIngredients = (
	state: TIngredientsConstructorState
) => state.constructorIngredients;

export const getBunConstructorIngredients = (
	state: TIngredientsConstructorState
) => state.constructorIngredients.bun;

export const getItemsConstructorIngredients = (
	state: TIngredientsConstructorState
) => state.constructorIngredients.itemsConstructor;

export const getIdsConstructorIngredients = createSelector(
	[
		(state) => state.constructorIngredients.bun,
		(state) => state.constructorIngredients.itemsConstructor,
	],
	(bun, itemsConstructor) => {
		const ids = [];

		if (itemsConstructor.length) {
			ids.push(
				itemsConstructor.map((item: TConstructorIngredient) => item._id)
			);
		}

		if (bun) {
			ids.push(bun._id);
			ids.unshift(bun._id);
		}

		return ids;
	}
);

export const getTotalPrice = createSelector(
	[
		(state) => state.constructorIngredients.bun,
		(state) => state.constructorIngredients.itemsConstructor,
	],
	(bun, itemsConstructor) => {
		let totalPrice = 0;

		if (itemsConstructor.length) {
			totalPrice += itemsConstructor.reduce(
				(acc: number, item: TConstructorIngredient) => {
					return item.price + acc;
				},
				0
			);
		}

		if (bun) {
			totalPrice += bun.price * 2;
		}

		return totalPrice;
	}
);
