import styles from './burger-constructor-order.module.css';

import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	getBunConstructorIngredients,
	getItemsConstructorIngredients,
} from '@/services/ingrediens-constructor/selectors';
import { useSelector } from 'react-redux';

export const BurgerConstructorOrder = (): React.JSX.Element => {
	const bun = useSelector(getBunConstructorIngredients);
	const itemsConstructor = useSelector(getItemsConstructorIngredients);

	return (
		<div className={styles.order}>
			{bun && (
				<div className='pr-2'>
					<ConstructorElement
						type='top'
						isLocked={true}
						text={`${bun!.name} (верх)`}
						price={bun!.price}
						thumbnail={bun!.image}
					/>
				</div>
			)}
			{!bun && (
				<div className={`${styles.empty} ${styles.top}`}>Выберите булку</div>
			)}
			<ul className={`${styles.list} custom-scroll`}>
				{itemsConstructor.map((item) => (
					<li className={styles.item} key={item._id}>
						<DragIcon type='primary' />
						<ConstructorElement
							text={item!.name}
							price={item!.price}
							thumbnail={item!.image}
						/>
					</li>
				))}
				{!itemsConstructor.length && (
					<li className={`${styles.empty} `}>Выберите начинку</li>
				)}
			</ul>

			{bun && (
				<div className='pr-2'>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={`${bun!.name} (низ)`}
						price={bun!.price}
						thumbnail={bun!.image}
					/>
				</div>
			)}
			{!bun && (
				<div className={`${styles.empty} ${styles.bottom}`}>Выберите булку</div>
			)}
		</div>
	);
};
