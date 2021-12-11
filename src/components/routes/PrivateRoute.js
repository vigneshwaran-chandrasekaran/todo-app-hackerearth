import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { SESSION } from '../../services';
// import { Sidebar } from '../sidebar';
import { HeadNavbar } from '../common';

const { Content } = Layout;

function PrivateRoute({ children, location, ...rest }) {
	const dispatch = useDispatch();
	const { pathname } = location;

	useEffect(
		() => () => {
			/**
			 * to set last visited page url in redux store
			 */
			dispatch({
				type: 'SET_HISTORY_RECENT',
				payload: pathname,
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[pathname]
	);

	if (SESSION.isLoggedIn()) {
		return (
			<Layout>
				{/* <Sidebar /> */}
				<Content>
					<HeadNavbar />
					<div className="p-10 height-100">
						<Route {...rest}>{children}</Route>
					</div>
				</Content>
			</Layout>
		);
	}
	SESSION.logout();
}

export default PrivateRoute;
