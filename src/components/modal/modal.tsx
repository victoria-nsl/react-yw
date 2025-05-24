import { createPortal } from 'react-dom';
import { ReactNode, useEffect } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { isEscEvent } from '@/utils/helpers';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import { useDispatch } from 'react-redux';
import { DELETE_CURRENT_INGREDIENT } from '@/services/current-ingredient/actions';

const modalRoot: HTMLElement | null = document.getElementById('react-modals');

type TModalProps = {
	header: string;
	children: ReactNode;
};

export const Modal = ({ header, children }: TModalProps): React.JSX.Element => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch: any = useDispatch();

	const closeModalEsc = (evt: KeyboardEvent): void => {
		if (isEscEvent(evt)) {
			evt.preventDefault();
			closeModal();
		}
	};

	const closeModal = (): void => {
		dispatch({ type: DELETE_CURRENT_INGREDIENT });
	};

	useEffect(() => {
		document.addEventListener('keydown', closeModalEsc);

		return () => {
			document.removeEventListener('keydown', closeModalEsc);
		};
	}, []);

	return createPortal(
		<div className={styles.modal}>
			<div className={styles.modal_card}>
				<div className={styles.modal_header}>
					<p className='text text_type_main-large'>{header}</p>
					<button onClick={closeModal}>
						<CloseIcon type='primary' />
					</button>
				</div>
				{children}
			</div>
			<ModalOverlay />
		</div>,
		modalRoot!
	);
};
