import React, { useEffect } from 'react';
import styles from './app.module.css';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { Preloader } from '../preloader/preloader';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients } from '@/services/ingredients/actions';
import { getAllIngredients } from '@/services/ingredients/selectors';
import { Home } from '@/pages/home/home';

export const App = (): React.JSX.Element => {
	const { loading, error, items } = useSelector(getAllIngredients);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch: any = useDispatch();

	useEffect(() => {
		dispatch(loadIngredients());
	}, [dispatch]);

	return (
		<div className={styles.app}>
			<AppHeader />

			<main className={`${styles.main} pt-10 pb-10 pl-5 pr-5`}>
				<div className={styles.inner_main}>
					{loading && <Preloader />}
					{error && (
						<p className={`${styles.error} text text_type_main-medium`}>
							Произошла ошибка
						</p>
					)}
					{!loading && !error && items.length && <Home />}
				</div>
			</main>
		</div>
	);
};

export default App;
