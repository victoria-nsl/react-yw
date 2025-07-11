import { OrderFeed } from '../order-feed/order-feed';
import styles from './orders-history.module.css';

export const OrdersHistory = (): React.JSX.Element => {
	return (
		<div className={`${styles.wrapper} custom-scroll`}>
			<OrderFeed />;
		</div>
	);
};
