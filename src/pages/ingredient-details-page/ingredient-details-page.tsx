import { IngredientDetails } from '@/components/burger-ingredients/ingredient-details/ingredient-details';

export const IngredientDetailsPage = (): React.JSX.Element => {
	return (
		<div className='mt-20'>
			<h1 className='text text_type_main-large'>Детали ингредиента</h1>
			<IngredientDetails />
		</div>
	);
};
