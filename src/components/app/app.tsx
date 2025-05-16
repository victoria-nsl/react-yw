import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { Preloader } from '../preloader/preloader';

export const App = (): React.JSX.Element => {
	const url = 'https://norma.nomoreparties.space/api/ingredients';

	const [ingredients, setIngredients] = useState({
		isLoading: false,
		hasError: false,
		data: [],
	});

	useEffect(() => {
		const getIngredients = async (): Promise<void> => {
			setIngredients({ ...ingredients, isLoading: true });

			try {
				const res = await fetch(url);
				const data = await res.json();

				setIngredients({ isLoading: false, hasError: false, data: data.data });
			} catch (error) {
				setIngredients({ ...ingredients, hasError: true, isLoading: false });
			}
		};
		getIngredients();
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />

			<main className={`${styles.main} pt-10 pb-10 pl-5 pr-5`}>
				<h1 className={`${styles.title} text text_type_main-large  mb-5 pl-5`}>
					Соберите бургер
				</h1>
				<div className={styles.inner_main}>
					{ingredients.isLoading && <Preloader />}
					{ingredients.hasError && (
						<p
							style={{
								color: 'red',
							}}
							className='text text_type_main-medium'>
							Произошла ошибка
						</p>
					)}
					{!ingredients.isLoading &&
						!ingredients.hasError &&
						ingredients.data.length && (
							<div className={styles.wrapper_data}>
								<BurgerIngredients ingredients={ingredients.data} />
								<BurgerConstructor ingredients={ingredients.data} />
							</div>
						)}
				</div>
			</main>
		</div>
	);
};

export default App;
