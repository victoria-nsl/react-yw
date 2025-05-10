import styles from './burger-ingredients-category.module.css';
import { TIngredient, TIngredientTypes } from '@/utils/types';
import { BurgerIngredientsCard } from '../burger-ingredients-card/burger-ingredients-card';

type TBurgerIngredientsCategoryProps = {
	ingredientsCategory: TIngredient[];
	type: TIngredientTypes;
};

export const BurgerIngredientsCategory = ({
	ingredientsCategory,
	type,
}: TBurgerIngredientsCategoryProps): React.JSX.Element => {
	const getNameType = (type: TIngredientTypes): string => {
		switch (type) {
			case 'bun':
				return 'Булки';
			case 'main':
				return 'Начинки';
			case 'sauce':
				return 'Соусы';
		}
	};
	return (
		<div>
			<h2 className='text text_type_main-large'>{getNameType(type)}</h2>
			<ul className={`${styles.list} pt-6 pl-4 pr-2 pb-0`}>
				{ingredientsCategory.map((ingredientCard) => (
					<BurgerIngredientsCard key={ingredientCard._id} {...ingredientCard} />
				))}
			</ul>
		</div>
	);
};
