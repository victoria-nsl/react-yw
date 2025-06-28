import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { useCallback, useRef } from 'react';
import type { Identifier } from 'dnd-core';

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
};

type DragCollectedProps = {
	opacity: boolean;
};

type DropCollectedProps = {
	handlerId: Identifier | null;
};

export const BurgerConstructorIngredientCard = ({
	id,
	ingredientConstructor,
	index,
	moveCard,
}: TBurgerConstructorIngredientCardProps): React.JSX.Element => {
	const ref = useRef<HTMLLIElement | null>(null);
	const dispatch = useDispatch();

	const onDelete = useCallback(() => {
		dispatch(deleteConstructorIngredient(ingredientConstructor));
	}, [ingredientConstructor, dispatch]);

	const [{ opacity }, drag] = useDrag<DragItem, unknown, DragCollectedProps>({
		type: 'card',
		item: () => {
			return { id, index };
		},
		collect: (monitor) => ({
			opacity: !!monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop<DragItem, unknown, DropCollectedProps>({
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

			if (!clientOffset) return;

			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

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
