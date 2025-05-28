import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { useCallback, useRef } from 'react';
import type { Identifier, XYCoord } from 'dnd-core';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon';
import { deleteConstructorIngredient } from '@/services/ingrediens-constructor/actions';
import { TConstructorIngredient } from '@/utils/types';
import styles from './burger-constructor-ingredient-card.module.css';

type TBurgerConstructorIngredientCardProps = {
	id: string;
	ingredientConstructor: TConstructorIngredient;
	index: number;
	moveCard: (dragIndex: number, hoverIndex: number) => void;
};

type DragItem = {
	index: number;
	id: string;
	type: string;
};

export const BurgerConstructorIngredientCard = ({
	id,
	ingredientConstructor,
	index,
	moveCard,
}: TBurgerConstructorIngredientCardProps): React.JSX.Element => {
	const ref = useRef<HTMLLIElement>(null);
	const dispatch = useDispatch();

	const onDelete = useCallback(() => {
		dispatch(deleteConstructorIngredient(ingredientConstructor));
	}, [ingredientConstructor]);

	const [{ opacity }, drag] = useDrag({
		type: 'card',
		item: () => {
			return { id, index };
		},
		collect: (monitor) => ({
			opacity: !!monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
		accept: 'card',
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref.current.getBoundingClientRect();

			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			const clientOffset = monitor.getClientOffset();

			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			moveCard(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	drag(drop(ref));

	return (
		<li
			className={`${styles.card_constructor}  ${opacity && styles.opacity_view}`}
			ref={ref}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={ingredientConstructor!.name}
				price={ingredientConstructor!.price}
				thumbnail={ingredientConstructor!.image}
				handleClose={() => onDelete()}
			/>
		</li>
	);
};
