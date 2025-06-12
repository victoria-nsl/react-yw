import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';
import styles from './login.module.css';
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

	const login = useCallback(
		(evt: SyntheticEvent<Element, Event>) => {
			evt.preventDefault();
			dispatch(loginUser(form));
		},
		[form, dispatch]
	);

	const onChange = useCallback(
		(evt: ChangeEvent<HTMLInputElement>) => {
			setValueForm({ ...form, [evt.target!.name]: evt.target!.value });
		},
		[form]
	);

	return (
		<div className={styles.wrapper}>
			<form className={styles.form}>
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
				<div className={styles.wrapper_button}>
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						onClick={login}>
						Войти
					</Button>
				</div>
			</form>
			<div className={`${styles.wrapper_link} mb-4`}>
				<p className='text text_type_main-default text_color_inactive'>
					Вы — новый пользователь?
				</p>
				<Link
					to='/register'
					className={`${styles.link} text text_type_main-default`}>
					Зарегистрироваться
				</Link>
			</div>
			<div className={styles.wrapper_link}>
				<p className='text text_type_main-default text_color_inactive'>
					Забыли пароль?
				</p>
				<Link
					to='/forgot-password'
					className={`${styles.link} text text_type_main-default`}>
					Восстановить пароль
				</Link>
			</div>
		</div>
	);
};
