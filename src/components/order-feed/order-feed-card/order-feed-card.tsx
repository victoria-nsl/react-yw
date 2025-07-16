import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient, TOrder, TStatusOrderKeys } from '@/utils/types';
import styles from './order-feed-card.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getNameStatus } from '@/utils/helpers';
import { useSelector } from '@/services/store';
import { getAllIngredients } from '@/services/ingredients/selectors';
import { OrderFeedItem } from './order-feed-item/order-feed-item';

type TOrderCardProps = { order: TOrder };

export const OrderFeedCard = ({
	order,
}: TOrderCardProps): React.JSX.Element => {
	const location = useLocation();
	const allIngredients = useSelector(getAllIngredients);

	const ingredientsWithImage = useMemo(
		() => order.ingredients.slice(0, 6).reverse(),
		[order.ingredients]
	);

	const url = useMemo(
		() =>
			location.pathname === '/feed'
				? `/feed/${order.number}`
				: `/profile/orders/${order.number}`,
		[location.pathname, order.number]
	);

	const getTotalPrice = (ids: string[]) => {
		let totalPrice = 0;

		totalPrice += ids.reduce((acc: number, id: string) => {
			const price =
				allIngredients.items.find(
					(ingredient: TIngredient) => ingredient._id === id
				)?.price || 0;

			return price! + acc;
		}, 0);

		return totalPrice;
	};

	return (
		<li>
			<Link
				to={url}
				state={{ background: location, numberOrder: order.number }}
				className={styles.link}>
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
						{ingredientsWithImage.map((ingredient, index) => (
							<OrderFeedItem
								ingredientId={ingredient}
								total={order.ingredients.length}
								number={index}
								key={index}
							/>
						))}
					</ul>

					<div className='wrapper_price ml-6'>
						<span className='text text_type_digits-default'>
							{getTotalPrice(order.ingredients)}
						</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</Link>
		</li>
	);
};
