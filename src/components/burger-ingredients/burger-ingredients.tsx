import React, { useCallback, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsCategory } from './burger-ingredients-category/burger-ingredients-category';

import { useSelector } from 'react-redux';

import { getIngredientsByCategory } from '@/services/ingredients/selectors';
import { TIngredientsCategoriesKeys } from '@/utils/types';

export const BurgerIngredients = (): React.JSX.Element => {
	const itemsBun = useSelector(getIngredientsByCategory('bun'));
	const itemsFilling = useSelector(getIngredientsByCategory('filling'));
	const itemsSauce = useSelector(getIngredientsByCategory('sauce'));

	const container = useRef<HTMLInputElement>(null);
	const bunCategory = useRef<HTMLInputElement>(null);
	const mainCategory = useRef<HTMLInputElement>(null);
	const sauceCategory = useRef<HTMLInputElement>(null);
	const [activeTab, setActiveTab] = useState<TIngredientsCategoriesKeys>('bun');

	const handlerOnClickTab = useCallback(
		(item: TIngredientsCategoriesKeys) => {
			switch (item) {
				case 'bun':
					setActiveTab('bun');
					bunCategory.current!.scrollIntoView({ behavior: 'smooth' });
					break;
				case 'filling':
					setActiveTab('filling');
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

	const handlerOnScroll = () => {
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
				setActiveTab('filling');
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
						value='filling'
						active={activeTab === 'filling'}
						onClick={() => {
							handlerOnClickTab('filling');
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
						ingredientsCategory={itemsFilling}
						type='filling'
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
