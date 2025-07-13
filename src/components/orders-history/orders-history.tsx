import { OrderFeed } from '../order-feed/order-feed';
import styles from './orders-history.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { getOrderFeedMyInfo } from '@/services/order-feed-my/selectors';
import {
	wsConnectOrderFeedMy,
	wsDisconnectOrderFeedMy,
} from '@/services/order-feed-my/actions';

export const FEED_ORDER_MY_SERVER_URL =
	'wss://norma.nomoreparties.space/orders';

export const OrdersHistory = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const ordersInfo = useSelector(getOrderFeedMyInfo);
	const allorders = ordersInfo.orders;

	useEffect(() => {
		const accessToken = localStorage
			.getItem('accessToken')!
			.replace('Bearer ', '');
		dispatch(
			wsConnectOrderFeedMy(`${FEED_ORDER_MY_SERVER_URL}?token=${accessToken}`)
		);

		return () => {
			dispatch(wsDisconnectOrderFeedMy());
		};
	}, []);

	return (
		<div className={`${styles.wrapper} custom-scroll`}>
			<OrderFeed orders={allorders} />;
		</div>
	);
};
