export type TIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
};

export type TIngredientCategories = 'bun' | 'main' | 'sauce';

export type TIngredientsState = {
	ingredients: {
		loading: boolean;
		error: boolean;
		items: TIngredient[];
	};
};

export type TCurrentIngredientState = {
	currentIngredient: { currentItem: TIngredient };
};
