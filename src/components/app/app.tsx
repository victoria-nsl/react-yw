import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { Preloader } from '../preloader/preloader';
import { useDispatch, useSelector } from '@/services/store';
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
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import { ProfileOrderPage } from '@/pages/profile-order-page/profile-order-page';
import { FeedOrderPage } from '@/pages/feed-order-page/feed-order-page';
import { OrderFeedDetailsCard } from '../order-feed/order-feed-details-card/order-feed-details-card';

export const App = (): React.JSX.Element => {
	const { loading, error, items } = useSelector(getAllIngredients);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;
	const numberOrder = location.state && location.state.numberOrder;

	useEffect(() => {
		dispatch(checkUserAuth());
		dispatch(loadIngredients());
	}, [dispatch]);

	const handleModalClose = (): void => {
		navigate(-1);
	};

	return (
		<div className={styles.app}>
			<AppHeader />

			<main className={`${styles.main} pt-10 pl-5 pr-5`}>
				<div className={styles.inner_main}>
					{loading && <Preloader />}
					{error && (
						<p className='error text text_type_main-medium'>Произошла ошибка</p>
					)}
					{!loading && !error && items.length && (
						<>
							<Routes location={background || location}>
								<Route path='/' element={<Home />} />
								<Route
									path='/login'
									element={<OnlyUnAuth component={<Login />} />}
								/>
								<Route
									path='/register'
									element={<OnlyUnAuth component={<Register />} />}
								/>
								<Route
									path='/forgot-password'
									element={<OnlyUnAuth component={<ForgotPassword />} />}
								/>
								<Route
									path='/reset-password'
									element={<OnlyUnAuth component={<ResetPassword />} />}
								/>
								<Route
									path='/profile'
									element={<OnlyAuth component={<Profile />} />}>
									<Route index element={<ChangeDataUser />} />
									<Route path='orders' element={<OrdersHistory />} />
								</Route>
								<Route
									path='/profile/orders/:id'
									element={<OnlyAuth component={<ProfileOrderPage />} />}
								/>
								<Route path='/feed' element={<Feed />} />
								<Route path='/feed/:id' element={<FeedOrderPage />} />
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
									<Route
										path='/feed/:id'
										element={
											<Modal
												header={`#${numberOrder}`}
												textType='text_type_main-medium'
												onClose={handleModalClose}>
												<OrderFeedDetailsCard />
											</Modal>
										}
									/>
									<Route
										path='/profile/orders/:id'
										element={
											<Modal
												header={`#${numberOrder}`}
												textType='text_type_main-medium'
												onClose={handleModalClose}>
												<OrderFeedDetailsCard />
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
