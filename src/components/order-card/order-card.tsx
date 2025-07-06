import { TOrder, TStatusOrderKeys } from '@/utils/types';
import { Link } from 'react-router-dom';
import styles from './order-card.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ImageIngredient } from '../image-ingredient/image-ingredient';
import iconCheese from '../../images/cheese.png';
import { getNameStatus } from '@/utils/helpers';

type TOrderCardProps = { order: TOrder };

export const OrderCard = ({ order }: TOrderCardProps): React.JSX.Element => {
	const orderId = order['_id'];

	return (
		<li>
			<Link to={orderId} className={styles.link}>
				<div className={`${styles.wrapper_block} mb-6`}>
					<span className='text text_type_digits-default'>#{order.number}</span>

					<span className='text text_type_main-default text_color_inactive'>
						<FormattedDate date={new Date(order.createdAt)} />
					</span>
				</div>
				<h2 className='text text_type_main-medium  mb-2'>{order.name}</h2>
				<p
					className={`${order.status === 'done' && styles.done} text text_type_main-small  mb-6`}>
					{getNameStatus(order.status as TStatusOrderKeys)}
				</p>
				<div className={styles.wrapper_block}>
					<ul className={styles.list_ingredients}>
						{order.ingredients.length > 5 && (
							<li
								className={`${styles.item_ingredient} ${styles.item_ingredient_others}`}>
								<ImageIngredient image={iconCheese} name='Другие ингредиенты' />
								<span className='text text_type_main-default'>
									+{order.ingredients.length - 5}
								</span>
							</li>
						)}
						{order.ingredients
							.slice(0, 5)
							.reverse()
							.map((ingredient) => (
								<li className={styles.item_ingredient} key={ingredient._id}>
									<ImageIngredient
										image={ingredient.image}
										name={ingredient.name}
									/>
								</li>
							))}
					</ul>

					<div className={styles.wrapper_price}>
						<span className='text text_type_digits-default'>{order.price}</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</Link>
		</li>
	);
};
