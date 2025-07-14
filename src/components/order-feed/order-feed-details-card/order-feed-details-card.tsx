import styles from './order-feed-details-card.module.css';
import { getNameStatus } from '@/utils/helpers';
import { TIngredient, TStatusOrderKeys } from '@/utils/types';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { OrderFeedDetailsItem } from './order-feed-details-item/order-feed-details-item';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { getOrderByNumber } from '@/services/order/actions';
import { Preloader } from '@/components/preloader/preloader';
import { getAllIngredients } from '@/services/ingredients/selectors';
import { getOrdersMy } from '@/services/order-feed-my/selectors';
import { getOrders } from '@/services/order-feed/selectors';
import { getOrder } from '@/services/order/selectors';

export const OrderFeedDetailsCard = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const allIngredients = useSelector(getAllIngredients);
	const { id } = useParams();
	const order = useSelector((state) => {
		let order = getOrders(state).find((order) => order.number === +id!);
		if (order) return order;

		order = getOrdersMy(state).find((order) => order.number === +id!);
		if (order) return order;

		order = getOrder(state)!;
		return order && order.number === +id! ? order : null;
	});

	useEffect(() => {
		dispatch(getOrderByNumber(+id!));
	}, []);

	const getQuantityByIdIngredients = (ids: string[]) => {
		const quantityByIdIngredients: {
			ingredientId: string;
			quantity: number;
		}[] = [];

		if (ids.length) {
			ids.forEach((id) => {
				if (quantityByIdIngredients.find((item) => item.ingredientId === id)) {
					quantityByIdIngredients.find(
						(item) => item.ingredientId === id
					)!.quantity += 1;
				} else {
					quantityByIdIngredients.push({ ingredientId: id, quantity: 1 });
				}
			});
		}

		return quantityByIdIngredients;
	};

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
		<div className={styles.wrapper}>
			{!order && <Preloader />}
			{order && (
				<>
					<div
						className={`${styles.text_center} text text_type_digits-default mb-10`}>
						#{order!.number}
					</div>

					<h2 className='text text_type_main-medium  mb-2'>{order!.name}</h2>
					<p
						className={`${order!.status === 'done' && 'order_done'} text text_type_main-small  mb-15`}>
						{getNameStatus(order!.status as TStatusOrderKeys)}
					</p>

					<h3 className='text text_type_main-medium  mb-6'>Состав: </h3>

					<ul className={`${styles.list} custom-scroll`}>
						{getQuantityByIdIngredients(order!.ingredients).map(
							(quantityByIdIngredient, index) => (
								<OrderFeedDetailsItem
									quantityByIdIngredient={quantityByIdIngredient}
									key={index}
								/>
							)
						)}
					</ul>

					<div className={`${styles.wrapper_block} mt-10`}>
						<span className='text text_type_main-default text_color_inactive'>
							<FormattedDate date={new Date(order!.createdAt)} />
						</span>
						<div className='wrapper_price'>
							<span className='text text_type_digits-default'>
								{getTotalPrice(order!.ingredients)}
							</span>
							<CurrencyIcon type='primary' />
						</div>
					</div>
				</>
			)}
		</div>
	);
};
