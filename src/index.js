import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'typeface-roboto';
import './styles/style.scss';
import Router from './router';
import store from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import { ErrorBoundary } from './components/common';

console.log('build = ', process.env.NODE_ENV);

ReactDOM.render(
	<ErrorBoundary>
		<Provider store={store}>
			<Router />
		</Provider>
	</ErrorBoundary>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
