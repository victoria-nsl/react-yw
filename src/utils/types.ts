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

export type TConstructorIngredient = TIngredient & { id: string };

export type TIngredientCategories = 'bun' | 'main' | 'sauce';

export type TUser = {
	name: string;
	email: string;
};

export type TUserState = {
	auth: {
		user: TUser;
		isAuthChecked: boolean;
	};
};

export type TIngredientsState = {
	ingredients: {
		loading: boolean;
		error: boolean;
		items: TIngredient[];
	};
};

export type TIngredientsConstructorState = {
	constructorIngredients: {
		bun: TConstructorIngredient;
		itemsConstructor: TConstructorIngredient[];
	};
};

export type TOrderState = {
	order: {
		loading: boolean;
		error: boolean;
		orderId: number;
	};
};
