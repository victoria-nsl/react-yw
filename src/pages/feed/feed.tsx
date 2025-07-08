import { ordersDone, orders, ordersPending } from '@/utils/helpers';
import styles from './feed.module.css';
import { OrderCard } from '@/components/order-card/order-card';

export const Feed = (): React.JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<h1 className=' text text_type_main-large mb-5'>Лента заказов</h1>
			<div className={styles.wrapper_blocks}>
				<div className={`${styles.wrapper_cards} custom-scroll`}>
					<ul className={styles.list}>
						{orders.map((orderCard) => (
							<OrderCard key={orderCard._id} order={orderCard} />
						))}
					</ul>
				</div>
				<div className={`${styles.wrapper_info} custom-scroll`}>
					<div className={`${styles.wrapper_lists} mb-15`}>
						<div>
							<h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
							<ul className={styles.list_orders}>
								{ordersDone.slice(0, 14).map((order) => (
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
								{ordersPending.slice(0, 14).map((order) => (
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
					<p className='text text_type_digits-large mb-15'>28 752</p>

					<h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
					<p className='text text_type_digits-large'>138</p>
				</div>
			</div>
		</div>
	);
};
