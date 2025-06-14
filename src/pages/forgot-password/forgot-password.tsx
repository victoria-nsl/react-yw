import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';
import { forgotPasswordApi } from '@/utils/api';

export const ForgotPassword = (): React.JSX.Element => {
	const [form, setValueForm] = useState({ email: '' });
	const navigate = useNavigate();

	const restore = (evt: SyntheticEvent<Element, Event>) => {
		evt.preventDefault();
		forgotPasswordApi(form)
			.then((data) => {
				if (data.success) {
					localStorage.setItem('resetPassword', 'true');
					navigate('/reset-password', { replace: true });
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

	return (
		<div className='wrapper_page_form'>
			<form className='form' onSubmit={restore}>
				<h1 className='text text_type_main-medium'>Восстановление пароля</h1>
				<EmailInput
					onChange={onChange}
					value={form.email}
					placeholder='Укажите e-mail'
					name={'email'}
					isIcon={false}
				/>
				<div className='wrapper_button'>
					<Button htmlType='submit' type='primary' size='medium'>
						Восстановить
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
