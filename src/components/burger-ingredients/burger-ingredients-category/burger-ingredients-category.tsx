import styles from './burger-ingredients-category.module.css';
import { TIngredient, TIngredientCategories } from '@/utils/types';
import { BurgerIngredientsCard } from '../burger-ingredients-card/burger-ingredients-card';
import { SetStateAction, useMemo } from 'react';

type TBurgerIngredientsCategoryProps = {
	ingredientsCategory: TIngredient[];
	type: TIngredientCategories;
	onValueChange: (newValue: SetStateAction<null | TIngredient>) => void;
};

export const BurgerIngredientsCategory = ({
	ingredientsCategory,
	type,
	onValueChange,
}: TBurgerIngredientsCategoryProps): React.JSX.Element => {
	const getNameType = useMemo(
		() =>
			(type: TIngredientCategories): string => {
				switch (type) {
					case 'bun':
						return 'Булки';
					case 'main':
						return 'Начинки';
					case 'sauce':
						return 'Соусы';
				}
			},
		[]
	);
	return (
		<div>
			<h2 className={`${styles.title} text text_type_main-medium`}>
				{getNameType(type)}
			</h2>
			<ul className={`${styles.list} pt-6 pl-4 pr-2 pb-0`}>
				{ingredientsCategory.map((ingredientCard) => (
					<BurgerIngredientsCard
						key={ingredientCard._id}
						ingredient={ingredientCard}
						onValueChange={onValueChange}
					/>
				))}
			</ul>
		</div>
	);
};
