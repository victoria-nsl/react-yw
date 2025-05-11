import React from 'react';
import styles from './app.module.css';
import { ingredients } from '@utils/ingredients.ts';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { AppHeader } from '@components/app-header/app-header.tsx';

export const App = (): React.JSX.Element => {
	return (
		<div className={styles.app}>
			<AppHeader />

			<main className={`${styles.main} pt-10 pb-10 pl-5 pr-5`}>
				<h1 className={`${styles.title} text text_type_main-large  mb-5 pl-5`}>
					Соберите бургер
				</h1>
				<div className={styles.inner_main}>
					<BurgerIngredients ingredients={ingredients} />
					<BurgerConstructor ingredients={ingredients} />
				</div>
			</main>
		</div>
	);
};

export default App;
