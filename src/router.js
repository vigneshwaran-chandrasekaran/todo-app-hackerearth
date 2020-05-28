import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthRoute, PrivateRoute, Loader } from './components/common';
import * as Pages from './pages';

const { Content } = Layout;

export default function Router() {
	return (
		<BrowserRouter>
			<Layout style={{ minHeight: '100vh' }}>
				<Loader />
				<Layout>
					<Content>
						<Switch>
							<AuthRoute exact path={['/', '/login']}>
								<Pages.Login />
							</AuthRoute>
							<AuthRoute path="/signup">
								<Pages.Signup />
							</AuthRoute>

							{/* authenticated pages starts*/}
							<PrivateRoute exact path={'/todo'}>
								<Pages.Todo />
							</PrivateRoute>
							<PrivateRoute exact path={['/home', '/about']}>
								<Pages.About />
							</PrivateRoute>
							{/* authenticated pages ends*/}

							<Route path="*">
								<Pages.NotFound />
							</Route>
						</Switch>
					</Content>
				</Layout>
			</Layout>
		</BrowserRouter>
	);
}
