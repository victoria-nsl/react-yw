import React from 'react';
import styles from './home.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@/components/burger-contructor/burger-constructor';

export const Home = (): React.JSX.Element => {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className={styles.wrapper_data}>
				<BurgerIngredients />
				<BurgerConstructor />
			</div>
		</DndProvider>
	);
};
