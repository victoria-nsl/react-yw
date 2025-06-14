import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/services/auth/actions';

export const Login = (): React.JSX.Element => {
	const [form, setValueForm] = useState({ email: '', password: '' });
	//eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch: any = useDispatch();

	const login = (evt: SyntheticEvent<Element, Event>) => {
		evt.preventDefault();
		dispatch(loginUser(form));
	};

	const onChange = useCallback(
		(evt: ChangeEvent<HTMLInputElement>) => {
			setValueForm({ ...form, [evt.target!.name]: evt.target!.value });
		},
		[form]
	);

	return (
		<div className='wrapper_page_form'>
			<form className='form' onSubmit={login}>
				<h1 className='text text_type_main-medium'>Вход</h1>
				<EmailInput
					onChange={onChange}
					value={form.email}
					name={'email'}
					isIcon={false}
				/>
				<PasswordInput
					onChange={onChange}
					value={form.password}
					name={'password'}
					extraClass='mb-2'
				/>
				<div className='wrapper_button'>
					<Button htmlType='submit' type='primary' size='medium'>
						Войти
					</Button>
				</div>
			</form>
			<div className='wrapper_link mb-4'>
				<p className='text text_type_main-default text_color_inactive'>
					Вы — новый пользователь?
				</p>
				<Link to='/register' className='link text text_type_main-default'>
					Зарегистрироваться
				</Link>
			</div>
			<div className='wrapper_link'>
				<p className='text text_type_main-default text_color_inactive'>
					Забыли пароль?
				</p>
				<Link
					to='/forgot-password'
					className='link text text_type_main-default'>
					Восстановить пароль
				</Link>
			</div>
		</div>
	);
};
