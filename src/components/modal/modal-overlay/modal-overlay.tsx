import { useDispatch } from 'react-redux';
import styles from './modal-overlay.module.css';
import { DELETE_CURRENT_INGREDIENT } from '@/services/current-ingredient/actions';

export const ModalOverlay = (): React.JSX.Element => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch: any = useDispatch();

	const closeModal = (): void => {
		dispatch({ type: DELETE_CURRENT_INGREDIENT });
	};
	return (
		<div
			className={styles.overlay}
			aria-hidden='true'
			onClick={closeModal}></div>
	);
};
