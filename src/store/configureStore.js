import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import rootReducer from './reducers';
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage';

/**
 * read already saved state data from local storage
 */
const persistedState = loadFromLocalStorage();

/**
 * this will work on both firefox and chrome
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * all environment middleware
 */
const middlewares = [thunk];

/**
 * STORE
 */
const store = createStore(
	rootReducer,
	persistedState, // initial store values (it will override the rootReducer state values)
	composeEnhancers(
		applyMiddleware(...middlewares) // middleware for logging, thunk...
	)
);

/**
 * to find which mode is running
 */
// console.log(process.env.NODE_ENV);

store.subscribe(
	throttle(() => {
		/**
		 * write current state data to local storage
		 */
		saveToLocalStorage(store.getState());
	}, 2000)
);

export default store;
