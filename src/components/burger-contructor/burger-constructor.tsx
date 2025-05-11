import { TIngredient } from '@utils/types.ts';
import React from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorOrder } from './burger-constructor-order/burger-constructor-order';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

type TBurgerConstructorProps = {
	ingredients: TIngredient[];
};

export const BurgerConstructor = ({
	ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
	return (
		<section className={`${styles.burger_constructor} pb-2`}>
			<BurgerConstructorOrder ingredients={ingredients} />
			<div className={`${styles.result} mt-10 mr-4`}>
				<div className='pt-1 pb-1'>
					<span className='text text_type_digits-medium pr-2'>610</span>
					<CurrencyIcon type='primary' />
				</div>
				<Button htmlType='button' type='primary' size='medium'>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};
