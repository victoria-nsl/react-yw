import styles from './burger-constructor-order.module.css';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {
	getBunConstructorIngredients,
	getItemsConstructorIngredients,
} from '@/services/ingrediens-constructor/selectors';
import { TIngredient } from '@/utils/types';
import {
	addConstructorIngredient,
	updateConstructorIngredient,
} from '@/services/ingrediens-constructor/actions';

import { BurgerConstructorIngredientCard } from '../burger-constructor-ingredient-card/burger-constructor-ingredient-card';

export const BurgerConstructorOrder = (): React.JSX.Element => {
	const bun = useSelector(getBunConstructorIngredients);
	const itemsConstructor = useSelector(getItemsConstructorIngredients);
	const dispatch = useDispatch();

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(itemId: TIngredient) {
			dispatch(addConstructorIngredient({ ...itemId, id: uuidv4() }));
		},
	});

	const moveCard = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			const dragCard = itemsConstructor[dragIndex];
			const newCards = [...itemsConstructor];

			newCards.splice(dragIndex, 1);
			newCards.splice(hoverIndex, 0, dragCard);

			dispatch(updateConstructorIngredient(newCards));
		},
		[itemsConstructor, dispatch]
	);

	return (
		<div ref={dropTarget} className={styles.order}>
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
				{itemsConstructor.map((item, index) => (
					<BurgerConstructorIngredientCard
						key={item.id}
						index={index}
						id={item.id}
						ingredientConstructor={item}
						moveCard={moveCard}
					/>
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
