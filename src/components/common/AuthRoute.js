import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SESSION } from '../../services';

function AuthRoute({ children, ...rest }) {
	if (SESSION.isLoggedIn()) {
		return (
			<Redirect
				to={{
					pathname: '/todo',
				}}
			/>
		);
	} else {
		return <Route {...rest}>{children}</Route>;
	}
}

export default AuthRoute;
