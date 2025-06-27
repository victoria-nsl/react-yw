const IngredientsCategories = {
	bun: 'Булки',
	main: 'Начинки',
	sauce: 'Соусы',
} as const;

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

export type TIngredientsCategoriesKeys = keyof typeof IngredientsCategories;

export type TIngredientsCategoriesValues =
	(typeof IngredientsCategories)[TIngredientsCategoriesKeys];

export type TUser = {
	name: string;
	email: string;
	password: string;
};

export type TNameEmailUser = Pick<TUser, 'name' | 'email'>;

export type TEmailPasswordUser = Pick<TUser, 'email' | 'password'>;

export type TEmailUser = Pick<TUser, 'email'>;

export type TResetUser = Pick<TUser, 'password'> & { token: string };

export type TUserState = {
	auth: {
		user: TNameEmailUser;
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
