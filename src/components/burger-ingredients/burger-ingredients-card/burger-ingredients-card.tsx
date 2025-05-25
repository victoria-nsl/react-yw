import { TIngredient } from '@/utils/types';
import styles from './burger-ingredients-card.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { setCurrentIngredient } from '@/services/current-ingredient/actions';

type TBurgerIngredientsCardProps = {
	ingredient: TIngredient;
};

export const BurgerIngredientsCard = ({
	ingredient,
}: TBurgerIngredientsCardProps): React.JSX.Element => {
	const dispatch = useDispatch();

	const addCurrentIngredient = () => dispatch(setCurrentIngredient(ingredient));

	return (
		<li
			className={styles.card}
			onClick={() => addCurrentIngredient()}
			aria-hidden='true'>
			<div className={`${styles.wrapper_image} pl-4 pr-4`}>
				<img src={ingredient.image} alt={`${ingredient.name}.`} />
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
