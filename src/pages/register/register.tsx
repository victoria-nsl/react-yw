import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUser } from '@/services/auth/actions';
import { useDispatch } from 'react-redux';

export const Register = (): React.JSX.Element => {
	const [form, setValueForm] = useState({ name: '', email: '', password: '' });
	const dispatch = useDispatch();

	const register = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		// @ts-expect-error "Ignor"
		dispatch(registerUser(form));
	};

	const onChange = useCallback(
		(evt: ChangeEvent<HTMLInputElement>) => {
			setValueForm({ ...form, [evt.target!.name]: evt.target!.value });
		},
		[form]
	);

	return (
		<div className='wrapper_page_form'>
			<form className='form' onSubmit={register}>
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

				<div className='wrapper_button'>
					<Button htmlType='submit' type='primary' size='medium'>
						Зарегистрироваться
					</Button>
				</div>
			</form>

			<div className='wrapper_link'>
				<p className='text text_type_main-default text_color_inactive'>
					Уже зарегистрированы?
				</p>
				<Link to='/login' className='link text text_type_main-default'>
					Войти
				</Link>
			</div>
		</div>
	);
};
