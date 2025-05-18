import React, { SetStateAction, useCallback, useMemo, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { TIngredient, TIngredientCategories } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsCategory } from './burger-ingredients-category/burger-ingredients-category';
import { IngredientDetails } from './ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const BurgerIngredients = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const [currentIngredient, setCurrentIngredient] =
		useState<TIngredient | null>(null);

	const updateCurrentIngredient = useCallback(
		(newValue: SetStateAction<null | TIngredient>): void => {
			setCurrentIngredient(newValue);
		},
		[]
	);

	const getIngredientsByCategory = useMemo(
		() =>
			(type: TIngredientCategories): TIngredient[] =>
				ingredients.filter((item) => item.type === type),
		[ingredients]
	);

	const onClose = useCallback(() => setCurrentIngredient(null), []);

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
					onValueChange={updateCurrentIngredient}
				/>
				<BurgerIngredientsCategory
					ingredientsCategory={getIngredientsByCategory('main')}
					type='main'
					onValueChange={updateCurrentIngredient}
				/>
				<BurgerIngredientsCategory
					ingredientsCategory={getIngredientsByCategory('sauce')}
					type='sauce'
					onValueChange={updateCurrentIngredient}
				/>
			</div>
			{currentIngredient && (
				<Modal header='Детали ингредиента' onClose={onClose}>
					<IngredientDetails
						currentIngredient={currentIngredient}></IngredientDetails>
				</Modal>
			)}
		</section>
	);
};
