import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './profile.module.css';
import { logoutUser } from '@/services/auth/actions';
import { useDispatch } from 'react-redux';
import { MouseEvent } from 'react';

export const Profile = (): React.JSX.Element => {
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	const logout = (evt: MouseEvent): void => {
		evt.preventDefault();
		// @ts-expect-error "Ignor"
		dispatch(logoutUser());
	};

	return (
		<div className={styles.wrapper}>
			<div>
				<div className={`${styles.menu} mb-20`}>
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
					<button
						className={`${styles.button_logout} mt-4 mb-4`}
						onClick={logout}>
						<span className='text text_type_main-medium'>Выход</span>
					</button>
				</div>

				<p className='text text_type_main-default text_color_inactive'>
					{pathname === '/profile'
						? 'В этом разделе вы можете изменить свои персональные данные'
						: pathname === '/profile/orders'
							? 'В этом разделе вы можете просмотреть свою историю заказов'
							: ''}
				</p>
			</div>

			<Outlet />
		</div>
	);
};
