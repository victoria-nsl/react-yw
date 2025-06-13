import { getIsAuthChecked, getUser } from '../services/auth/selectors';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from './preloader/preloader';

const Protected = ({
	onlyUnAuth = false,
	component,
}: {
	onlyUnAuth: boolean;
	component: React.JSX.Element;
}) => {
	const isAuthChecked = useSelector(getIsAuthChecked);
	const user = useSelector(getUser);
	const location = useLocation();

	if (!isAuthChecked) {
		return <Preloader />;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }) => (
	<Protected onlyUnAuth={true} component={component} />
);
