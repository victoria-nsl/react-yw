import styles from './order-details-card.module.css';
import { getNameStatus, orders } from '@/utils/helpers';
import { TStatusOrderKeys } from '@/utils/types';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { OrderDetailsItem } from './order-details-item/order-details-item';

export const OrderDetailsCard = (): React.JSX.Element => {
	//Временно, пока нет реальных данных
	const { id } = useParams();
	const order = orders.find((item) => item._id === id);

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
				{order!.ingredients.map((ingredient) => (
					<OrderDetailsItem ingredient={ingredient} key={ingredient._id} />
				))}
			</ul>

			<div className={`${styles.wrapper_block} mt-10`}>
				<span className='text text_type_main-default text_color_inactive'>
					<FormattedDate date={new Date(order!.createdAt)} />
				</span>
				<div className='wrapper_price'>
					<span className='text text_type_digits-default'>{order!.price}</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
