import { ImageIngredient } from '@/components/image-ingredient/image-ingredient';
import { getIngredientById } from '@/services/ingredients/selectors';
import { useSelector } from '@/services/store';
import styles from './order-feed-item.module.css';

type TOrderItemProps = {
	ingredientId: string;
	total: number;
	number: number;
};

export const OrderFeedItem = ({
	ingredientId,
	total,
	number,
}: TOrderItemProps): React.JSX.Element => {
	const ingredient = useSelector(getIngredientById(ingredientId!));

	return (
		<li className={styles.item_ingredient}>
			<ImageIngredient image={ingredient!.image} name={ingredient!.name} />
			{number === 0 && total > 5 && (
				<span className='text text_type_main-default'>+{total - 5}</span>
			)}
		</li>
	);
};
