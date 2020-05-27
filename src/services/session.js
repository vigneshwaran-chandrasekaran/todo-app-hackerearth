import { isEmpty } from 'lodash';
import { USER_INFO_LOCAL_STORAGE_KEY as LOCAL_KEY } from '../helpers/constants';

class Session {
	constructor() {
		if (!isEmpty(localStorage.getItem(LOCAL_KEY))) {
			const data = JSON.parse(localStorage.getItem(LOCAL_KEY));
			this.token = data.user.accessToken;
			this.userId = data.user._id;
			this.status = data.user.status;
		}
	}

	isLoggedIn() {
		return !!this.token;
	}

	setToken(data) {
		this.token = data.user.accessToken;
		this.userId = data.user._id;
		this.status = data.user.status;
		localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
	}

	removeToken() {
		this.token = null;
		this.userId = null;
		this.status = null;
		localStorage.removeItem(LOCAL_KEY);
	}

	removeItem(key) {
		localStorage.removeItem(key);
		return false;
	}

	logout() {
		this.removeToken();
		window.location = process.env.REACT_APP_LOGIN_URL;
	}
}

export const SESSION = new Session();
