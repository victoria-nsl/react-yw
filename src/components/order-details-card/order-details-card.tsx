import styles from './order-details-card.module.css';
import { getNameStatus, orders } from '@/utils/helpers';
import { TStatusOrderKeys } from '@/utils/types';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ImageIngredient } from '../image-ingredient/image-ingredient';

export const OrderDetailsCard = (): React.JSX.Element => {
	//Временно, пока нет реальных данных
	const order = orders[0];
	return (
		<div className={styles.wrapper}>
			<div
				className={`${styles.text_center} text text_type_digits-default mb-10`}>
				#{order.number}
			</div>

			<h2 className='text text_type_main-medium  mb-2'>{order.name}</h2>
			<p
				className={`${order.status === 'done' && styles.done} text text_type_main-small  mb-15`}>
				{getNameStatus(order.status as TStatusOrderKeys)}
			</p>

			<h3 className='text text_type_main-medium  mb-6'>Состав: </h3>

			<ul className={`${styles.list_ingredients} custom-scroll`}>
				{order.ingredients.map((ingredient) => (
					<li className={styles.item_ingredient} key={ingredient._id}>
						<div className={styles.wrapper_title}>
							<ImageIngredient
								image={ingredient.image}
								name={ingredient.name}
							/>
							<span className='text text_type_main-default'>
								{ingredient.name}
							</span>
						</div>
						<div className={styles.wrapper_price}>
							<span className='text text_type_digits-default'>
								1 х {ingredient.price}
							</span>
							<CurrencyIcon type='primary' />
						</div>
					</li>
				))}
			</ul>

			<div className={`${styles.wrapper_block} mt-10`}>
				<span className='text text_type_main-default text_color_inactive'>
					<FormattedDate date={new Date(order.createdAt)} />
				</span>
				<div className={styles.wrapper_price}>
					<span className='text text_type_digits-default'>{order.price}</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
