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

	// url == /profile, onlyUnAuth = false, user == null
	// url == /login, from: /profile, onlyUnAuth = true, user == null
	// url == /login, from: /profile, onlyUnAuth = true, user != null
	// url == /profile, onlyUnAuth = false, user != null
	// url == /profile, onlyUnAuth = false, user == null

	if (!isAuthChecked) {
		return <Preloader />;
	}

	if (!onlyUnAuth && !user) {
		// For authorized, but unauthorized
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		// For unauthorized, but authorized
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	// !onlyUnAuth && user for authorized and authorized
	// onlyUnAuth && !user for unauthorized and unauthorized

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }) => (
	<Protected onlyUnAuth={true} component={component} />
);
