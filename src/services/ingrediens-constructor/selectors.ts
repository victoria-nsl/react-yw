import {
	TConstructorIngredient,
	TIngredientsConstructorState,
} from '@/utils/types';
import { createSelector } from 'reselect';

export type TConstructorIngredientsStore = {
	constructorIngredients: TIngredientsConstructorState;
};

export const getAllConstructorIngredients = (
	state: TConstructorIngredientsStore
): TIngredientsConstructorState => state.constructorIngredients;

export const getBunConstructorIngredients = (
	state: TConstructorIngredientsStore
): TConstructorIngredient | null => state.constructorIngredients.bun;

export const getItemsConstructorIngredients = (
	state: TConstructorIngredientsStore
): TConstructorIngredient[] => state.constructorIngredients.itemsConstructor;

export const getIdsConstructorIngredients = createSelector(
	[
		(state) => state.constructorIngredients.bun,
		(state) => state.constructorIngredients.itemsConstructor,
	],
	(bun, itemsConstructor): string[] => {
		let ids: string[] = [];

		if (itemsConstructor.length) {
			const idsItems = itemsConstructor.map(
				(item: TConstructorIngredient) => item._id
			);

			ids = [...idsItems];
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
	(bun, itemsConstructor): number => {
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

export const getQuantityByIdIngredients = createSelector(
	[
		(state) => state.constructorIngredients.bun,
		(state) => state.constructorIngredients.itemsConstructor,
	],
	(bun, itemsConstructor): Record<string, number> => {
		const quantityByIdIngredients: Record<string, number> = {};

		if (bun) quantityByIdIngredients[bun['_id']] = 2;
		if (itemsConstructor.length) {
			itemsConstructor.forEach((item: TConstructorIngredient) => {
				if (quantityByIdIngredients[item['_id']]) {
					quantityByIdIngredients[item['_id']] =
						quantityByIdIngredients[item['_id']] + 1;
				} else {
					quantityByIdIngredients[item['_id']] = 1;
				}
			});
		}

		return quantityByIdIngredients;
	}
);
