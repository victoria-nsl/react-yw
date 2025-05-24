import React, { useCallback, useMemo } from 'react';
import styles from './burger-ingredients.module.css';
import {
	TIngredient,
	TIngredientCategories,
	TIngredientsState,
} from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsCategory } from './burger-ingredients-category/burger-ingredients-category';
import { IngredientDetails } from './ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_CURRENT_INGREDIENT } from '@/services/current-ingredient/actions';

export const BurgerIngredients = (): React.JSX.Element => {
	const { items } = useSelector(
		(state: { ingredients: TIngredientsState }) => state.ingredients
	);

	const { currentItem } = useSelector(
		(state: { currentIngredient: { currentItem: TIngredient } }) =>
			state.currentIngredient
	);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch: any = useDispatch();

	const onClose = useCallback(
		() => dispatch({ type: DELETE_CURRENT_INGREDIENT }),
		[]
	);

	const getIngredientsByCategory = useMemo(
		() =>
			(type: TIngredientCategories): TIngredient[] =>
				items.filter((item) => item.type === type),
		[items]
	);

	return (
		<section className={styles.burger_ingredients}>
			<nav className='mb-10'>
				<ul className={styles.menu}>
					<Tab value='bun' active={true} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='main' active={false} onClick={() => {}}>
						Начинки
					</Tab>
					<Tab value='sauce' active={false} onClick={() => {}}>
						Соусы
					</Tab>
				</ul>
			</nav>

			<div className={`${styles.categories} custom-scroll`}>
				<BurgerIngredientsCategory
					ingredientsCategory={getIngredientsByCategory('bun')}
					type='bun'
				/>
				<BurgerIngredientsCategory
					ingredientsCategory={getIngredientsByCategory('main')}
					type='main'
				/>
				<BurgerIngredientsCategory
					ingredientsCategory={getIngredientsByCategory('sauce')}
					type='sauce'
				/>
			</div>
			{currentItem && (
				<Modal header='Детали ингредиента' onClose={onClose}>
					<IngredientDetails
						currentIngredient={currentItem}></IngredientDetails>
				</Modal>
			)}
		</section>
	);
};
