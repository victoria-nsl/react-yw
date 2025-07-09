import React, { useCallback, useState } from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorOrder } from './burger-constructor-order/burger-constructor-order';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from './order-details/order-details';
import { Modal } from '../modal/modal';
import { useDispatch, useSelector } from '@/services/store';
import {
	getIdsConstructorIngredients,
	getTotalPrice,
} from '@/services/ingrediens-constructor/selectors';
import { createOrder } from '@/services/order/actions';
import { getUser } from '@/services/auth/selectors';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor = (): React.JSX.Element => {
	const [visible, setVisible] = useState(false);
	const totalPrice = useSelector(getTotalPrice);
	const ids = useSelector(getIdsConstructorIngredients);
	const dispatch = useDispatch();
	const user = useSelector(getUser);
	const navigate = useNavigate();

	const onClose = useCallback((): void => setVisible(false), []);

	const sendOrder = useCallback((): void => {
		if (!user) {
			navigate('/login');
		}
		if (!ids.length) return;

		dispatch(createOrder(ids));
		setVisible(true);
	}, [ids, dispatch, user, navigate]);

	return (
		<section className={`${styles.burger_constructor} pb-2`}>
			<BurgerConstructorOrder />
			<div className={`${styles.result} mt-10 mr-4`}>
				<div className={`${styles.price} wrapper_price pt-1 pb-1`}>
					<span className='text text_type_digits-medium'>{totalPrice}</span>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					onClick={sendOrder}
					disabled={!ids.length}>
					Оформить заказ
				</Button>
			</div>
			{visible && (
				<Modal header='' onClose={onClose}>
					<OrderDetails></OrderDetails>
				</Modal>
			)}
		</section>
	);
};
