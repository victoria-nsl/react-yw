import {
	wsConnectOrderFeed,
	wsDisconnectOrderFeed,
} from '@/services/order-feed/actions';
import styles from './feed.module.css';
import { OrderFeed } from '@/components/order-feed/order-feed';
import { useDispatch, useSelector } from '@/services/store';

import { useEffect } from 'react';
import { getOrderFeedInfo, getOrders } from '@/services/order-feed/selectors';

export const FEED_ORDER_SERVER_URL =
	'ws://norma.nomoreparties.space/orders/all';

export const Feed = (): React.JSX.Element => {
	const ordersInfo = useSelector(getOrderFeedInfo);
	const allorders = useSelector(getOrders);

	const ordersDone = ordersInfo.orders
		.filter((order) => order.status === 'done')
		.map((order) => order.number)
		.slice(0, 14);
	const ordersPending = ordersInfo.orders
		.filter((order) => order.status === 'pending')
		.map((order) => order.number)
		.slice(0, 14);
	const total = ordersInfo.total;
	const totalToday = ordersInfo.totalToday;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(wsConnectOrderFeed(FEED_ORDER_SERVER_URL));

		return () => {
			dispatch(wsDisconnectOrderFeed());
		};
	}, []);

	return (
		<div className={styles.wrapper}>
			<h1 className=' text text_type_main-large mb-5'>Лента заказов</h1>
			<div className={styles.wrapper_blocks}>
				<div className={`${styles.wrapper_order_feed} custom-scroll`}>
					<OrderFeed orders={allorders} />
				</div>
				<div className={`${styles.wrapper_info} custom-scroll`}>
					<div className={`${styles.wrapper_lists} mb-15`}>
						<div>
							<h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
							<ul className={styles.list_orders}>
								{ordersDone.map((order) => (
									<li
										className='text text_type_digits-default order_done'
										key={order}>
										{order}
									</li>
								))}
							</ul>
						</div>
						<div>
							<h3 className='text text_type_main-medium mb-6'>В работе:</h3>
							<ul className={styles.list_orders}>
								{ordersPending.map((order) => (
									<li className='text text_type_digits-default' key={order}>
										{order}
									</li>
								))}
							</ul>
						</div>
					</div>

					<h3 className='text text_type_main-medium'>
						Выполнено за все время:
					</h3>
					<p className='text text_type_digits-large mb-15'>{total}</p>

					<h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
					<p className='text text_type_digits-large'>{totalToday}</p>
				</div>
			</div>
		</div>
	);
};
