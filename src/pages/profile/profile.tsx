import { NavLink, Outlet } from 'react-router-dom';
import styles from './profile.module.css';

export const Profile = (): React.JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.menu}>
				<NavLink
					to='/profile'
					end
					className={({ isActive }) =>
						isActive
							? styles.link_active + ' ' + styles.link + ' mt-4 mb-4'
							: styles.link + ' mt-4 mb-4'
					}>
					<span className='text text_type_main-medium'>Профиль</span>
				</NavLink>
				<NavLink
					to='/profile/orders'
					end
					className={({ isActive }) =>
						isActive
							? styles.link_active + ' ' + styles.link + ' mt-4 mb-4'
							: styles.link + ' mt-4 mb-4'
					}>
					<span className='text text_type_main-medium'>История заказов</span>
				</NavLink>
				<button className={`${styles.button_logout} mt-4 mb-4`}>
					<span className='text text_type_main-medium'>Выход</span>
				</button>
			</div>
			<Outlet />
		</div>
	);
};
