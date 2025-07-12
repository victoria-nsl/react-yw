import styles from './order-feed-details-card.module.css';
import { getNameStatus } from '@/utils/helpers';
import { TStatusOrderKeys } from '@/utils/types';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { OrderFeedDetailsItem } from './order-feed-details-item/order-feed-details-item';
import { getOrder } from '@/services/order/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { getOrderByNumber } from '@/services/order/actions';
import { Preloader } from '@/components/preloader/preloader';

export const OrderFeedDetailsCard = (): React.JSX.Element => {
	const { id } = useParams();
	const { order } = useSelector(getOrder);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOrderByNumber(+id!));
	}, []);

	if (!order) {
		return <Preloader />;
	}

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

	return (
		<div className={styles.wrapper}>
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
					{/* <span className='text text_type_digits-default'>{order!.price}</span> */}
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
