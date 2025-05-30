import { TCurrentIngredientState } from '@/utils/types';

export const getCurrentIngredient = (state: TCurrentIngredientState) =>
	state.currentIngredient;
