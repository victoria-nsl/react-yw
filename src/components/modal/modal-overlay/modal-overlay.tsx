import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
	onClose: () => void;
};

export const ModalOverlay = ({
	onClose,
}: TModalOverlayProps): React.JSX.Element => {
	return (
		<div className={styles.overlay} onClick={onClose} aria-hidden='true'></div>
	);
};
