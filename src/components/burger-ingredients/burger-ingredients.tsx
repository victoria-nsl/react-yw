import React, { SetStateAction, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { TIngredient, TIngredientTypes } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsCategory } from './burger-ingredients-category/burger-ingredients-category';
import { IngredientDetails } from './ingredients-details/ingredients-details';
import { Modal } from '../modal-components/modal/modal';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const BurgerIngredients = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const [currentIngredient, setCurrentIngredient] =
		useState<TIngredient | null>(null);

	const updateState = (newValue: SetStateAction<null | TIngredient>): void => {
		setCurrentIngredient(newValue);
	};

	const getIngredientsByCategory = (type: TIngredientTypes): TIngredient[] =>
		ingredients.filter((item) => item.type === type);

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
					onValueChange={updateState}
				/>
				<BurgerIngredientsCategory
					ingredientsCategory={getIngredientsByCategory('main')}
					type='main'
					onValueChange={updateState}
				/>
				<BurgerIngredientsCategory
					ingredientsCategory={getIngredientsByCategory('sauce')}
					type='sauce'
					onValueChange={updateState}
				/>
			</div>
			{currentIngredient && (
				<Modal
					header='Детали инградиента'
					onClose={() => setCurrentIngredient(null)}>
					<IngredientDetails
						currentIngredient={currentIngredient}></IngredientDetails>
				</Modal>
			)}
		</section>
	);
};
