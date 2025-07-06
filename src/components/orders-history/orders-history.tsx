import { OrderCard } from '../order-card/order-card';
import styles from './orders-history.module.css';
import { orders } from '@/utils/helpers';

export const OrdersHistory = (): React.JSX.Element => {
	return (
		<div className={`${styles.wrapper} custom-scroll`}>
			<ul className={styles.list}>
				{orders.map((orderCard) => (
					<OrderCard key={orderCard._id} order={orderCard} />
				))}
			</ul>
		</div>
	);
};
