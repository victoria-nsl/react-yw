import styles from './burger-ingredients-card.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

type TBurgerIngredientsCardProps = {
	name: string;
	price: number;
	image: string;
	__v: number;
};

export const BurgerIngredientsCard = ({
	name,
	image,
	price,
	__v,
}: TBurgerIngredientsCardProps): React.JSX.Element => {
	return (
		<li className={styles.card}>
			<div className={`${styles.wrapper_image} pl-4 pr-4`}>
				<img src={image} alt='Инградиент' />
				<div className={`${styles.info} pt-1 pb-1`}>
					<span className='text text_type_digits-default'>{price}</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
			<h3 className='text text_type_main-small'>{name}</h3>
			{__v > 0 ? <Counter count={__v} size='default' extraClass='m-1' /> : null}
		</li>
	);
};
