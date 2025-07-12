import styles from './order-feed-details-item.module.css';
import { ImageIngredient } from '@/components/image-ingredient/image-ingredient';
import { getIngredientById } from '@/services/ingredients/selectors';
import { useSelector } from '@/services/store';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TOrderDetailsItemProps = {
	quantityByIdIngredient: {
		ingredientId: string;
		quantity: number;
	};
};

export const OrderFeedDetailsItem = ({
	quantityByIdIngredient,
}: TOrderDetailsItemProps): React.JSX.Element => {
	const ingredient = useSelector(
		getIngredientById(quantityByIdIngredient.ingredientId!)
	);

	return (
		<li className={styles.item}>
			<div className={styles.wrapper_title}>
				<ImageIngredient image={ingredient!.image} name={ingredient!.name} />
				<span className='text text_type_main-default'>{ingredient!.name}</span>
			</div>
			<div className='wrapper_price'>
				<span className='text text_type_digits-default'>
					{quantityByIdIngredient.quantity} х {ingredient!.price}
				</span>
				<CurrencyIcon type='primary' />
			</div>
		</li>
	);
};
