import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useState,
	SyntheticEvent,
} from 'react';
import styles from './change-data-user.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from '@/services/store';
import { updateUser } from '@/services/auth/actions';
import { getAuth } from '@/services/auth/selectors';
import { TUser } from '@/utils/types';

export const ChangeDataUser = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const [form, setValueForm] = useState<TUser>({
		name: '',
		email: '',
		password: '',
	});
	const [isVisibleButtons, setVisibleButtons] = useState(false);
	const { user } = useSelector(getAuth);

	useEffect(() => {
		setValueForm({
			name: user?.name || '',
			email: user?.email || '',
			password: '',
		});
	}, [user]);

	const update = (evt: FormEvent<HTMLFormElement>): void => {
		evt.preventDefault();

		dispatch(updateUser(form));
		setVisibleButtons(false);
	};

	const cansel = useCallback(
		(evt: SyntheticEvent<Element, Event>): void => {
			evt.preventDefault();

			setValueForm({
				name: user?.name || '',
				email: user?.email || '',
				password: '',
			});
			setVisibleButtons(false);
		},
		[user]
	);

	const onChange = useCallback(
		(evt: ChangeEvent<HTMLInputElement>): void => {
			setValueForm({ ...form, [evt.target!.name]: evt.target!.value });
			setVisibleButtons(true);
		},
		[form]
	);

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={update}>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={onChange}
					icon={'EditIcon'}
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
					placeholder='Логин'
					isIcon={true}
					extraClass='mb-2'
				/>
				<PasswordInput
					onChange={onChange}
					value={form.password}
					name={'password'}
					icon={'EditIcon'}
				/>

				{isVisibleButtons && (
					<div className={styles.wrapper_button}>
						<Button
							htmlType='button'
							type='secondary'
							size='large'
							onClick={cansel}>
							Отмена
						</Button>
						<Button htmlType='submit' type='primary' size='medium'>
							Сохранить
						</Button>
					</div>
				)}
			</form>
		</div>
	);
};
