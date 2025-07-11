import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TOrder, TStatusOrderKeys } from '@/utils/types';
import styles from './order-feed-card.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ImageIngredient } from '../../image-ingredient/image-ingredient';

import { getNameStatus } from '@/utils/helpers';

type TOrderCardProps = { order: TOrder };

export const OrderFeedCard = ({
	order,
}: TOrderCardProps): React.JSX.Element => {
	const id = order['_id'];
	const location = useLocation();

	const url = useMemo(
		() =>
			location.pathname === '/feed' ? `/feed/${id}` : `/profile/orders/${id}`,
		[location.pathname, id]
	);

	return (
		<li>
			<Link to={url} state={{ background: location }} className={styles.link}>
				<div className={`${styles.wrapper_block} mb-6`}>
					<span className='text text_type_digits-default'>#{order.number}</span>

					<span className='text text_type_main-default text_color_inactive'>
						<FormattedDate date={new Date(order.createdAt)} />
					</span>
				</div>
				<h2 className='text text_type_main-medium  mb-2'>{order.name}</h2>
				{location.pathname !== '/feed' && (
					<p
						className={`${order.status === 'done' && 'order_done'} text text_type_main-small  `}>
						{getNameStatus(order.status as TStatusOrderKeys)}
					</p>
				)}
				<div className={`${styles.wrapper_block} mt-6`}>
					<ul className={styles.list_ingredients}>
						{order.ingredients.length >= 5 && (
							<li
								className={`${styles.item_ingredient} ${styles.item_ingredient_others}`}>
								<ImageIngredient
									image={order.ingredients[5].image}
									name='Изображение шестого ингредиента бургера'
								/>
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

					<div className='wrapper_price ml-6'>
						<span className='text text_type_digits-default'>{order.price}</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</Link>
		</li>
	);
};
