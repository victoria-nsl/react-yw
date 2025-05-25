import { TIngredient } from '@/utils/types';

type TCurrentIngredientState = {
	currentIngredient: { currentItem: TIngredient };
};

export const getCurrentIngredient = (state: TCurrentIngredientState) =>
	state.currentIngredient;
