import styles from './feed.module.css';
import { OrderFeed } from '@/components/order-feed/order-feed';

import { ordersTest } from '@/utils/helpers';
export const Feed = (): React.JSX.Element => {
	//Временно. Здесь получаем список заказов и отфильтрованные списки заказов (можно сделать в селекторах)
	const orders = ordersTest;
	const allorders = orders.orders;
	const ordersDone = orders.orders
		.filter((order) => order.status === 'done')
		.map((order) => order.number)
		.slice(0, 14);
	const ordersPending = orders.orders
		.filter((order) => order.status === 'pending')
		.map((order) => order.number)
		.slice(0, 14);
	const total = orders.total;
	const totalToday = orders.totalToday;

	return (
		<div className={styles.wrapper}>
			<h1 className=' text text_type_main-large mb-5'>Лента заказов</h1>
			<div className={styles.wrapper_blocks}>
				<div className={`${styles.wrapper_order_feed} custom-scroll`}>
					<OrderFeed orders={allorders} />;
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
