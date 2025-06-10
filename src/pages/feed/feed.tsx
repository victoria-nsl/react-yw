import styles from './feed.module.css';

export const Feed = (): React.JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<h1 className='text text_type_main-medium'>
				Здесь будет лента заказов...
			</h1>
		</div>
	);
};
