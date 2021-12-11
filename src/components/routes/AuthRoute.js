import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
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
	}
	return <Route {...rest}>{children}</Route>;
}

AuthRoute.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default AuthRoute;
