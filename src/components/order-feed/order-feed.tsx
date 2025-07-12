import { TOrder } from '@/utils/types';
import { OrderFeedCard } from './order-feed-card/order-feed-card';
import styles from './order-feed.module.css';

type TOrderFeedProps = {
	orders: TOrder[];
};

export const OrderFeed = ({ orders }: TOrderFeedProps): React.JSX.Element => {
	return (
		<ul className={styles.list}>
			{orders.map((order) => (
				<OrderFeedCard key={order.number} order={order} />
			))}
		</ul>
	);
};
