import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';
import styles from './register.module.css';
import { Link } from 'react-router-dom';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const Register = (): React.JSX.Element => {
	const [form, setValue] = useState({ name: '', email: '', password: '' });

	const register = useCallback(
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
				<h1 className='text text_type_main-medium'>Регистрация</h1>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={onChange}
					value={form.name}
					name={'name'}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass='ml-1'
				/>
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
						onClick={register}>
						Зарегистрироваться
					</Button>
				</div>
			</form>

			<div className={styles.wrapper_link}>
				<p className='text text_type_main-default text_color_inactive'>
					Уже зарегистрированы?
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
