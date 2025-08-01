import React, { useCallback, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsCategory } from './burger-ingredients-category/burger-ingredients-category';
import { useSelector } from '@/services/store';
import { getIngredientsByCategory } from '@/services/ingredients/selectors';
import { TIngredientsCategoriesKeys } from '@/utils/types';

export const BurgerIngredients = (): React.JSX.Element => {
	const itemsBun = useSelector(getIngredientsByCategory('bun'));
	const itemsMain = useSelector(getIngredientsByCategory('main'));
	const itemsSauce = useSelector(getIngredientsByCategory('sauce'));

	const container = useRef<HTMLInputElement | null>(null);
	const bunCategory = useRef<HTMLInputElement | null>(null);
	const mainCategory = useRef<HTMLInputElement | null>(null);
	const sauceCategory = useRef<HTMLInputElement | null>(null);
	const [activeTab, setActiveTab] = useState<TIngredientsCategoriesKeys>('bun');

	const handlerOnClickTab = useCallback(
		(item: TIngredientsCategoriesKeys): void => {
			switch (item) {
				case 'bun':
					setActiveTab('bun');
					bunCategory.current!.scrollIntoView({ behavior: 'smooth' });
					break;
				case 'main':
					setActiveTab('main');
					mainCategory.current!.scrollIntoView({ behavior: 'smooth' });
					break;
				case 'sauce':
					setActiveTab('sauce');
					sauceCategory.current!.scrollIntoView({ behavior: 'smooth' });
					break;
				default:
					setActiveTab('bun');
					bunCategory.current!.scrollIntoView({ behavior: 'smooth' });
			}
		},
		[bunCategory, mainCategory, sauceCategory]
	);

	const handlerOnScroll = (): void => {
		const topContainer = Math.round(
			container.current!.getBoundingClientRect().top
		);
		const topBun = Math.round(bunCategory.current!.getBoundingClientRect().top);
		const topMain = Math.round(
			mainCategory.current!.getBoundingClientRect().top
		);
		const topSause = Math.round(
			sauceCategory.current!.getBoundingClientRect().top
		);

		const spacingBun = Math.abs(topBun - topContainer);
		const spacingMain = Math.abs(topMain - topContainer);
		const spacingSause = Math.abs(topSause - topContainer);

		const spacingMin = Math.min(spacingBun, spacingMain, spacingSause);

		switch (spacingMin) {
			case spacingBun:
				setActiveTab('bun');
				break;
			case spacingMain:
				setActiveTab('main');
				break;
			case spacingSause:
				setActiveTab('sauce');
				break;
			default:
				setActiveTab('bun');
		}
	};

	return (
		<section className={styles.burger_ingredients}>
			<h1 className={`${styles.title} text text_type_main-large mb-5`}>
				Соберите бургер
			</h1>
			<nav className='mb-10'>
				<ul className={styles.menu}>
					<Tab
						value='bun'
						active={activeTab === 'bun'}
						onClick={() => {
							handlerOnClickTab('bun');
						}}>
						Булки
					</Tab>
					<Tab
						value='main'
						active={activeTab === 'main'}
						onClick={() => {
							handlerOnClickTab('main');
						}}>
						Начинки
					</Tab>
					<Tab
						value='sauce'
						active={activeTab === 'sauce'}
						onClick={() => {
							handlerOnClickTab('sauce');
						}}>
						Соусы
					</Tab>
				</ul>
			</nav>

			<div
				ref={container}
				className={`${styles.categories} custom-scroll`}
				onScroll={() => handlerOnScroll()}>
				<div ref={bunCategory}>
					<BurgerIngredientsCategory
						ingredientsCategory={itemsBun}
						type='bun'
					/>
				</div>
				<div ref={mainCategory}>
					<BurgerIngredientsCategory
						ingredientsCategory={itemsMain}
						type='main'
					/>
				</div>
				<div ref={sauceCategory}>
					<BurgerIngredientsCategory
						ingredientsCategory={itemsSauce}
						type='sauce'
					/>
				</div>
			</div>
		</section>
	);
};
