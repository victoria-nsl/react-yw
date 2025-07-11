import { OrderFeedCard } from './order-feed-card/order-feed-card';
import styles from './order-feed.module.css';
//Временно
import { orders } from '@/utils/helpers';

//сюда в пропсах передается массив заказов с ленты заказов

export const OrderFeed = (): React.JSX.Element => {
	return (
		<ul className={styles.list}>
			{orders.map((order) => (
				<OrderFeedCard key={order._id} order={order} />
			))}
		</ul>
	);
};
