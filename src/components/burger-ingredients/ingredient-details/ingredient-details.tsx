import styles from './ingredient-details.module.css';
import { useSelector } from '@/services/store';
import { useParams } from 'react-router-dom';
import { getIngredientById } from '@/services/ingredients/selectors';

export const IngredientDetails = (): React.JSX.Element => {
	const { ingredientId } = useParams();
	const currentItem = useSelector(getIngredientById(ingredientId!));

	return (
		<div className={styles.card}>
			<img
				className='mb-4'
				src={currentItem.image_large}
				alt={`${currentItem.name}.`}
			/>
			<h2 className='text text_type_main-medium mb-8'>{currentItem.name}</h2>
			<ul className={styles.list}>
				<li>
					<h3 className='text text_type_main-default text_color_inactive mb-2'>
						Калории,ккал
					</h3>
					<p className='text text_type_digits-default text_color_inactive mb-2'>
						{currentItem.calories}
					</p>
				</li>
				<li>
					<h3 className='text text_type_main-default text_color_inactive mb-2'>
						Белки, г
					</h3>
					<p className='text text_type_digits-default text_color_inactive'>
						{currentItem.proteins}
					</p>
				</li>
				<li>
					<h3 className='text text_type_main-default text_color_inactive mb-2'>
						Жиры, г
					</h3>
					<p className='text text_type_digits-default text_color_inactive'>
						{currentItem.fat}
					</p>
				</li>
				<li>
					<h3 className='text text_type_main-default text_color_inactive mb-2'>
						Углеводы, г
					</h3>
					<p className='text text_type_digits-default text_color_inactive'>
						{currentItem.carbohydrates}
					</p>
				</li>
			</ul>
		</div>
	);
};
