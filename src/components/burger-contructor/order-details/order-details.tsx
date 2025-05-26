import styles from './order-details.module.css';
import iconDone from '../../../images/done.png';
import { useSelector } from 'react-redux';
import { getOrder } from '@/services/order/selectors';
import { Preloader } from '@/components/preloader/preloader';

export const OrderDetails = (): React.JSX.Element => {
	const { loading, error, orderId } = useSelector(getOrder);
	console.log(loading, error, orderId);

	return (
		<div className={`${styles.card} pb-20 pt-4`}>
			{loading && <Preloader />}
			{error && (
				<p className={`${styles.error} text text_type_main-medium`}>
					Произошла ошибка
				</p>
			)}
			{!loading && !error && orderId && (
				<>
					<h2 className='text text_type_digits-large mb-8'>034536</h2>
					<p className='text text_type_main-medium mb-15'>
						{' '}
						идентификатор заказа
					</p>
					<div className={styles.wrapper_image}>
						<img src={iconDone} alt='Иконка галочка.' />
					</div>
					<p className='text text_type_main-default mb-2'>
						Ваш заказ начали готовить
					</p>
					<p className='text text_type_main-default text_color_inactive'>
						Дождитесь готовности на орбитальной станции
					</p>
				</>
			)}
		</div>
	);
};
