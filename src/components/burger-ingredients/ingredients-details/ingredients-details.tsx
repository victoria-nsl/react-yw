import { TIngredient } from '@/utils/types';

type TIngredientDetailsProps = {
	currentIngredient: TIngredient;
};

export const IngredientDetails = ({
	currentIngredient,
}: TIngredientDetailsProps): React.JSX.Element => {
	return <div> {currentIngredient.name}</div>;
};
