import styles from './order-feed-details-item.module.css';
import { ImageIngredient } from '@/components/image-ingredient/image-ingredient';
import { TIngredient } from '@/utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TOrderDetailsItemProps = { ingredient: TIngredient };

export const OrderFeedDetailsItem = ({
	ingredient,
}: TOrderDetailsItemProps): React.JSX.Element => {
	return (
		<li className={styles.item}>
			<div className={styles.wrapper_title}>
				<ImageIngredient image={ingredient.image} name={ingredient.name} />
				<span className='text text_type_main-default'>{ingredient.name}</span>
			</div>
			<div className='wrapper_price'>
				<span className='text text_type_digits-default'>
					1 х {ingredient.price}
				</span>
				<CurrencyIcon type='primary' />
			</div>
		</li>
	);
};
