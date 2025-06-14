import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { resetPasswordApi } from '@/utils/api';

export const ResetPassword = (): React.JSX.Element => {
	const [form, setValueForm] = useState({ password: '', token: '' });
	const navigate = useNavigate();
	const resetPassword = localStorage.getItem('resetPassword');

	const reset = (evt: SyntheticEvent<Element, Event>) => {
		evt.preventDefault();
		resetPasswordApi(form)
			.then((data) => {
				if (data.success) {
					localStorage.removeItem('resetPassword');
					navigate('/', { replace: true });
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const onChange = useCallback(
		(evt: ChangeEvent<HTMLInputElement>) => {
			setValueForm({ ...form, [evt.target!.name]: evt.target!.value });
		},
		[form]
	);

	if (!resetPassword) {
		return <Navigate to='/forgot-password' replace />;
	}

	return (
		<div className='wrapper_page_form'>
			<form className='form' onSubmit={reset}>
				<h1 className='text text_type_main-medium'>Восстановление пароля</h1>
				<PasswordInput
					onChange={onChange}
					placeholder={'Введите новый пароль'}
					value={form.password}
					name={'password'}
					extraClass='mb-2'
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					onChange={onChange}
					value={form.token}
					name={'token'}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass='ml-1'
				/>
				<div className='wrapper_button'>
					<Button htmlType='submit' type='primary' size='medium'>
						Сохранить
					</Button>
				</div>
			</form>

			<div className='wrapper_link'>
				<p className='text text_type_main-default text_color_inactive'>
					Вспомнили пароль?
				</p>
				<Link to='/login' className='link text text_type_main-default'>
					Войти
				</Link>
			</div>
		</div>
	);
};
