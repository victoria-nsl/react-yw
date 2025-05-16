import { TIngredient } from '@/utils/types';
import styles from './burger-ingredients-card.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { SetStateAction } from 'react';

type TBurgerIngredientsCardProps = {
	ingredient: TIngredient;
	onValueChange: (newValue: SetStateAction<null | TIngredient>) => void;
};

export const BurgerIngredientsCard = ({
	ingredient,
	onValueChange,
}: TBurgerIngredientsCardProps): React.JSX.Element => {
	return (
		<li
			className={styles.card}
			onClick={() => onValueChange(ingredient)}
			aria-hidden='true'>
			<div className={`${styles.wrapper_image} pl-4 pr-4`}>
				<img src={ingredient.image} alt='Инградиент' />
				<div className={`${styles.wrapper_price} pt-1 pb-1`}>
					<span className='text text_type_digits-default'>
						{ingredient.price}
					</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
			<h3 className='text text_type_main-small'>{ingredient.name}</h3>
			<Counter count={1} size='default' extraClass='m-1' />
		</li>
	);
};
