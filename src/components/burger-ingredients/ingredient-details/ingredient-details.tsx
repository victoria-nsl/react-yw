import { TIngredient } from '@/utils/types';
import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
	currentIngredient: TIngredient;
};

export const IngredientDetails = ({
	currentIngredient,
}: TIngredientDetailsProps): React.JSX.Element => {
	return (
		<div className={styles.card}>
			<img
				className='mb-4'
				src={currentIngredient.image_large}
				alt='Инградиент'
			/>
			<h2 className='text text_type_main-medium mb-8'>
				{currentIngredient.name}
			</h2>
			<ul className={styles.list}>
				<li>
					<h3 className='text text_type_main-default text_color_inactive mb-2'>
						Калории,ккал
					</h3>
					<p className='text text_type_digits-default text_color_inactive mb-2'>
						{currentIngredient.calories}
					</p>
				</li>
				<li>
					<h3 className='text text_type_main-default text_color_inactive mb-2'>
						Белки, г
					</h3>
					<p className='text text_type_digits-default text_color_inactive'>
						{currentIngredient.proteins}
					</p>
				</li>
				<li>
					<h3 className='text text_type_main-default text_color_inactive mb-2'>
						Жиры, г
					</h3>
					<p className='text text_type_digits-default text_color_inactive'>
						{currentIngredient.fat}
					</p>
				</li>
				<li>
					<h3 className='text text_type_main-default text_color_inactive mb-2'>
						Углеводы, г
					</h3>
					<p className='text text_type_digits-default text_color_inactive'>
						{currentIngredient.carbohydrates}
					</p>
				</li>
			</ul>
		</div>
	);
};
