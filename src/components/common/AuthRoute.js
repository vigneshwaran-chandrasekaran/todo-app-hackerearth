import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { SESSION } from '../../services';

function AuthRoute({ children, ...rest }) {
	const { recentlyVisitedUrl } = useSelector((state) => state.history);

	if (SESSION.isLoggedIn()) {
		return (
			<Redirect
				to={{
					pathname: recentlyVisitedUrl,
				}}
			/>
		);
	} else {
		return <Route {...rest}>{children}</Route>;
	}
}

export default AuthRoute;
