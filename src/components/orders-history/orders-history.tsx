import { ordersTest } from '@/utils/helpers';
import { OrderFeed } from '../order-feed/order-feed';
import styles from './orders-history.module.css';

export const OrdersHistory = (): React.JSX.Element => {
	//Временно. Здесь получаем список заказов
	const orders = ordersTest;
	const allorders = orders.orders;
	return (
		<div className={`${styles.wrapper} custom-scroll`}>
			<OrderFeed orders={allorders} />;
		</div>
	);
};
