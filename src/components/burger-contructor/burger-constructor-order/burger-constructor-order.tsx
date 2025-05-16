import React, { useMemo } from 'react';
import styles from './burger-constructor-order.module.css';
import { TIngredient } from '@utils/types.ts';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const BurgerConstructorOrder = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const bun = useMemo(
		() => ingredients.find((item) => item.type === 'bun'),
		[ingredients]
	);
	const otherIngredients = useMemo(
		() => ingredients.filter((item) => item.type !== 'bun'),
		[ingredients]
	);

	return (
		<div className={styles.order}>
			<div className='pr-2'>
				<ConstructorElement
					type='top'
					isLocked={true}
					text={`${bun!.name} (верх)`}
					price={bun!.price}
					thumbnail={bun!.image}
				/>
			</div>
			<ul className={`${styles.list} custom-scroll`}>
				{otherIngredients.map((ingredient) => (
					<li className={styles.item} key={ingredient._id}>
						<DragIcon type='primary' />
						<ConstructorElement
							text={ingredient!.name}
							price={ingredient!.price}
							thumbnail={ingredient!.image}
						/>
					</li>
				))}
			</ul>
			<div className='pr-2'>
				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={`${bun!.name} (низ)`}
					price={200}
					thumbnail={bun!.image}
				/>
			</div>
		</div>
	);
};
