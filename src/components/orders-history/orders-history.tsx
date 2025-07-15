import { OrderFeed } from '../order-feed/order-feed';
import styles from './orders-history.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';

import {
	wsConnectOrderFeedMy,
	wsDisconnectOrderFeedMy,
} from '@/services/order-feed-my/actions';
import { getOrdersMy } from '@/services/order-feed-my/selectors';

export const FEED_ORDER_MY_SERVER_URL =
	'wss://norma.nomoreparties.space/orders';

export const OrdersHistory = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const allorders = useSelector(getOrdersMy);

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
			<OrderFeed orders={allorders} />
		</div>
	);
};
