import type { Identifier } from 'dnd-core';

const IngredientsCategories = {
	bun: 'Булки',
	main: 'Начинки',
	sauce: 'Соусы',
} as const;

const StatusOrder = {
	created: 'Создан',
	pending: 'Готовится',
	done: 'Выполнен',
} as const;

export enum WebsocketStatus {
	CONNECTING = 'CONNECTING...',
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
}

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

export type TStatusOrderKeys = keyof typeof StatusOrder;

export type TStatusOrderValues = (typeof StatusOrder)[TStatusOrderKeys];

export type TOrder = {
	ingredients: string[];
	_id: string;
	name: string;
	status: string;
	number: number;
	createdAt: string;
	updatedAt: string;
};

export type TOrderByNumber = TOrder & {
	owner: string;
	__v: number;
};

export type TOrderFeedInfo = {
	success: boolean;
	orders: TOrder[];
	total: number;
	totalToday: number;
};

export type TUser = {
	name: string;
	email: string;
	password: string;
};

export type TNameEmailUser = Pick<TUser, 'name' | 'email'>;

export type TEmailPasswordUser = Pick<TUser, 'email' | 'password'>;

export type TEmailUser = Pick<TUser, 'email'>;

export type TResetUser = Pick<TUser, 'password'> & { token: string };

export type DropCollectedProps = {
	handlerId: Identifier | null;
};

export type DragCollectedProps = {
	opacity: boolean;
};

export type TAuthState = {
	user: TNameEmailUser | null;
	isAuthChecked: boolean;
};

export type TIngredientsState = {
	loading: boolean;
	error: string | null;
	items: TIngredient[];
};

export type TIngredientsConstructorState = {
	bun: TConstructorIngredient | null;
	itemsConstructor: TConstructorIngredient[];
};

export type TOrderState = {
	loading: boolean;
	error: string | null;
	orderId: number | null;
	order: TOrderByNumber | null;
};

export type TWsOrderFeedState = {
	messages: TOrderFeedInfo;
	error: string | null;
};
