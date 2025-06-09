import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
	return (
		<header className={styles.header}>
			<nav className={`${styles.menu} p-4`}>
				<div className={styles.menu_part_left}>
					{/*пока тут должны быть ссылки, а не например кнопки или абзацы*/}
					<NavLink to='/' className={styles.link}>
						{({ isActive }) => (
							<div
								className={`${styles.link_content} ${isActive ? styles.link_content_active : ''}`}>
								<BurgerIcon type='primary' />
								<p className='text text_type_main-default ml-2'>Конструктор</p>
							</div>
						)}
					</NavLink>
					<NavLink to='/feed' className={`${styles.link} ml-10`}>
						{({ isActive }) => (
							<div
								className={`${styles.link_content} ${isActive ? styles.link_content_active : ''}`}>
								<ListIcon type='secondary' />
								<p className='text text_type_main-default ml-2'>
									Лента заказов
								</p>
							</div>
						)}
					</NavLink>
				</div>
				<div className={styles.logo}>
					<Logo />
				</div>
				<NavLink
					to='/profile'
					className={`${styles.link}  ${styles.link_position_last}`}>
					{({ isActive }) => (
						<div
							className={`${styles.link_content} ${isActive ? styles.link_content_active : ''}`}>
							<ProfileIcon type='secondary' />
							<p className='text text_type_main-default ml-2'>Личный кабинет</p>
						</div>
					)}
				</NavLink>
			</nav>
		</header>
	);
};
