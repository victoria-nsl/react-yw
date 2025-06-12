import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { Preloader } from '../preloader/preloader';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients } from '@/services/ingredients/actions';
import { getAllIngredients } from '@/services/ingredients/selectors';
import { Home } from '@/pages/home/home';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details';
import { IngredientDetailsPage } from '@/pages/ingredient-details-page/ingredient-details-page';
import { Login } from '@/pages/login/login';
import { NotFound } from '@/pages/not-found/not-found';
import { Register } from '@/pages/register/register';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { Profile } from '@/pages/profile/profile';
import { ChangeDataUser } from '../change-data-user/change-data-user';
import { OrdersHistory } from '../orders-history/orders-history';
import { Feed } from '@/pages/feed/feed';
import { checkUserAuth } from '@/services/auth/actions';

export const App = (): React.JSX.Element => {
	const { loading, error, items } = useSelector(getAllIngredients);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch: any = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	useEffect(() => {
		dispatch(checkUserAuth());
		dispatch(loadIngredients());
	}, [dispatch]);

	const handleModalClose = () => {
		navigate(-1);
	};

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
					{!loading && !error && items.length && (
						<>
							<Routes location={background || location}>
								<Route path='/' element={<Home />} />
								<Route path='/login' element={<Login />} />
								<Route path='/register' element={<Register />} />
								<Route path='/forgot-password' element={<ForgotPassword />} />
								<Route path='/reset-password' element={<ResetPassword />} />
								<Route path='/profile' element={<Profile />}>
									<Route index element={<ChangeDataUser />} />
									<Route path='orders' element={<OrdersHistory />} />
								</Route>
								<Route path='/feed' element={<Feed />} />
								<Route
									path='/ingredients/:ingredientId'
									element={<IngredientDetailsPage />}
								/>
								<Route path='*' element={<NotFound />} />
							</Routes>

							{background && (
								<Routes>
									<Route
										path='/ingredients/:ingredientId'
										element={
											<Modal
												header='Детали ингредиента'
												onClose={handleModalClose}>
												<IngredientDetails />
											</Modal>
										}
									/>
								</Routes>
							)}
						</>
					)}
				</div>
			</main>
		</div>
	);
};

export default App;
