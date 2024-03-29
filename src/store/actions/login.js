import { SESSION } from 'services/session';
import { apiActions as api } from './api.actions';

export function login(credentials) {
	return (dispatch) => {
		dispatch(api.request());

		SESSION.authenticate(credentials)
			.then((user) => {
				dispatch({ type: 'LOGIN', authentication: user });
				dispatch(api.success(user));
			})
			.catch((e) => {
				dispatch(api.failure(e.toString()));
			});
	};
}
