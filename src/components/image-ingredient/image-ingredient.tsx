import styles from './image-ingredient.module.css';
type TImageIngredientProps = { image: string; name: string };

export const ImageIngredient = ({
	image,
	name,
}: TImageIngredientProps): React.JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<img src={image} alt={name} />
		</div>
	);
};
