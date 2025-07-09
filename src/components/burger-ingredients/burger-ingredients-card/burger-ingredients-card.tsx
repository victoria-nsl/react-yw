import { DragCollectedProps, TIngredient } from '@/utils/types';
import styles from './burger-ingredients-card.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '@/services/store';
import { getQuantityByIdIngredients } from '@/services/ingrediens-constructor/selectors';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

type TBurgerIngredientsCardProps = {
	ingredient: TIngredient;
};

export const BurgerIngredientsCard = ({
	ingredient,
}: TBurgerIngredientsCardProps): React.JSX.Element => {
	const quantityByIdIngredients = useSelector(getQuantityByIdIngredients);
	const location = useLocation();

	const ingredientId = ingredient['_id'];

	const [{ opacity }, refIngredient] = useDrag<
		TIngredient,
		unknown,
		DragCollectedProps
	>({
		type: 'ingredient',
		item: ingredient,
		collect: (monitor) => ({
			opacity: !!monitor.isDragging(),
		}),
	});

	return (
		<li className={`${styles.card}  ${opacity && styles.opacity_view}`}>
			<Link
				to={`/ingredients/${ingredientId}`}
				state={{ background: location }}
				className={styles.link}>
				<div className={`${styles.wrapper_image} pl-4 pr-4`}>
					<img
						ref={refIngredient}
						src={ingredient.image}
						alt={`${ingredient.name}.`}
					/>
					<div className='wrapper_price pt-1 pb-1'>
						<span className='text text_type_digits-default'>
							{ingredient.price}
						</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
				<h3 className='text text_type_main-small'>{ingredient.name}</h3>
				{quantityByIdIngredients[ingredient['_id']] && (
					<Counter
						count={quantityByIdIngredients[ingredient['_id']]}
						size='default'
						extraClass='m-1'
					/>
				)}
			</Link>
		</li>
	);
};
