import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';
import { Link } from 'react-router-dom';
import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';

export const ForgotPassword = (): React.JSX.Element => {
	const [form, setValue] = useState({ email: '' });

	const restore = useCallback(
		(evt: SyntheticEvent<Element, Event>) => {
			evt.preventDefault();
			console.log(form);
		},
		[form]
	);

	const onChange = useCallback(
		(evt: ChangeEvent<HTMLInputElement>) => {
			setValue({ ...form, [evt.target!.name]: evt.target!.value });
		},
		[form]
	);

	return (
		<div className={styles.wrapper}>
			<form className={styles.form}>
				<h1 className='text text_type_main-medium'>Восстановление пароля</h1>
				<EmailInput
					onChange={onChange}
					value={form.email}
					placeholder='Укажите e-mail'
					name={'email'}
					isIcon={false}
				/>
				<div className={styles.wrapper_button}>
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						onClick={restore}>
						Восстановить
					</Button>
				</div>
			</form>

			<div className={styles.wrapper_link}>
				<p className='text text_type_main-default text_color_inactive'>
					Вспомнили пароль?
				</p>
				<Link
					to='/login'
					className={`${styles.link} text text_type_main-default`}>
					Войти
				</Link>
			</div>
		</div>
	);
};
