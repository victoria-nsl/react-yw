import styles from './not-found.module.css';
import error404 from '../../images/error-404.jpg';
import { Link } from 'react-router-dom';

export const NotFound = (): React.JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<div className={`${styles.wrapper_image} mb-10`}>
				<img src={error404} alt='404 error.' />
			</div>
			<Link to='/' className={`${styles.link} text text_type_main-medium`}>
				Перейти на главную страницу
			</Link>
		</div>
	);
};
