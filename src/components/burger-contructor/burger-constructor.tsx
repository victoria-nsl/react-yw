import React, { useCallback, useState } from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorOrder } from './burger-constructor-order/burger-constructor-order';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from './order-details/order-details';
import { Modal } from '../modal/modal';
import { useSelector } from 'react-redux';
import { getAllIngredients } from '@/services/ingredients/selectors';

export const BurgerConstructor = (): React.JSX.Element => {
	const [visible, setVisible] = useState<boolean>(false);
	const { items } = useSelector(getAllIngredients);

	const onClose = useCallback(() => setVisible(false), []);

	const onOpen = () => setVisible(true);

	return (
		<section className={`${styles.burger_constructor} pb-2`}>
			<BurgerConstructorOrder ingredients={items} />
			<div className={`${styles.result} mt-10 mr-4`}>
				<div className={`${styles.wrapper_price} pt-1 pb-1`}>
					<span className='text text_type_digits-medium'>610</span>
					<CurrencyIcon type='primary' />
				</div>
				<Button htmlType='button' type='primary' size='medium' onClick={onOpen}>
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
