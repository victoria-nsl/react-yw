import React, { useEffect } from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { Preloader } from '../preloader/preloader';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients } from '@/services/ingredients/actions';
import { TIngredientsState } from '@/utils/types';

export const App = (): React.JSX.Element => {
	const { loading, error, items } = useSelector(
		(state: { ingredients: TIngredientsState }) => state.ingredients
	);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch: any = useDispatch();

	useEffect(() => {
		dispatch(loadIngredients());
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />

			<main className={`${styles.main} pt-10 pb-10 pl-5 pr-5`}>
				<h1 className={`${styles.title} text text_type_main-large  mb-5 pl-5`}>
					Соберите бургер
				</h1>
				<div className={styles.inner_main}>
					{loading && <Preloader />}
					{error && (
						<p className={`${styles.error} text text_type_main-medium`}>
							Произошла ошибка
						</p>
					)}
					{!loading && !error && items.length && (
						<div className={styles.wrapper_data}>
							<BurgerIngredients />
							<BurgerConstructor />
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default App;
