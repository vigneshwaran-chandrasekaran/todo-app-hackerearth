import { combineReducers } from 'redux';

import { api } from './api.reducer';
import { history } from './history.reducer';

const combinedReducer = combineReducers({
	api,
	history,
});

const rootReducer = (state, action) => {
	if (action.type === 'LOGOUT') {
		localStorage.clear(); // to reset all localStorage date

		return {
			api: {
				showLoader: false,
				status: null,
			},
			history: {
				recent: '/login',
			},
		};
	}
	return combinedReducer(state, action);
};

export default rootReducer;

// https://alligator.io/redux/reset-state-redux/
// https://www.freecodecamp.org/news/understanding-redux-the-worlds-easiest-guide-to-beginning-redux-c695f45546f6/
