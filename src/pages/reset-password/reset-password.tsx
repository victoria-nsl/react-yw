import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';
import styles from './reset-password.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const ResetPassword = (): React.JSX.Element => {
	const [form, setValue] = useState({ password: '', token: '' });

	const reset = useCallback(
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
				<div className={styles.wrapper_button}>
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						onClick={reset}>
						Сохранить
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
