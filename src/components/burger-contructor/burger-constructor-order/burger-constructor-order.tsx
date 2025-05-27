import styles from './burger-constructor-order.module.css';

import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	getBunConstructorIngredients,
	getItemsConstructorIngredients,
} from '@/services/ingrediens-constructor/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { TConstructorIngredient, TIngredient } from '@/utils/types';
import {
	addConstructorIngredient,
	deleteConstructorIngredient,
} from '@/services/ingrediens-constructor/actions';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

export const BurgerConstructorOrder = (): React.JSX.Element => {
	const bun = useSelector(getBunConstructorIngredients);
	const itemsConstructor = useSelector(getItemsConstructorIngredients);
	const dispatch = useDispatch();

	const onDelete = useCallback((item: TConstructorIngredient) => {
		dispatch(deleteConstructorIngredient(item));
	}, []);

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(itemId: TIngredient) {
			dispatch(addConstructorIngredient({ ...itemId, id: uuidv4() }));
		},
	});

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
			<ul ref={dropTarget} className={`${styles.list} custom-scroll`}>
				{itemsConstructor.map((item) => (
					<li className={styles.item} key={item.id}>
						<DragIcon type='primary' />
						<ConstructorElement
							text={item!.name}
							price={item!.price}
							thumbnail={item!.image}
							handleClose={() => onDelete(item)}
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
