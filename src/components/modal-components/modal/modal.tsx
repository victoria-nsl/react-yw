import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { ReactNode, useEffect } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { isEscEvent } from '@/utils/helpers';

const modalRoot: HTMLElement | null = document.getElementById('react-modals');

type TModalProps = {
	header: string;
	children: ReactNode;
	onClose: () => void;
};

export const Modal = ({
	header,
	onClose,
	children,
}: TModalProps): React.JSX.Element => {
	const closeModalEsc = (evt: KeyboardEvent): void => {
		if (isEscEvent(evt)) {
			evt.preventDefault();
			onClose();
		}
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
					<button onClick={onClose}>
						<CloseIcon type='primary' />
					</button>
				</div>
				{children}
			</div>
			<ModalOverlay onClose={onClose} />
		</div>,
		modalRoot!
	);
};
