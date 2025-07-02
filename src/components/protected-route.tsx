import { getIsAuthChecked, getUser } from '../services/auth/selectors';
import { useSelector } from '@/services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from './preloader/preloader';

type TProtectedProps = {
	onlyUnAuth: boolean;
	component: React.JSX.Element;
};

type TAuthProps = {
	component: React.JSX.Element;
};

const Protected = ({
	onlyUnAuth,
	component,
}: TProtectedProps): React.JSX.Element => {
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

export const OnlyAuth = ({ component }: TAuthProps): React.JSX.Element => (
	<Protected onlyUnAuth={false} component={component} />
);

export const OnlyUnAuth = ({ component }: TAuthProps): React.JSX.Element => (
	<Protected onlyUnAuth={true} component={component} />
);
