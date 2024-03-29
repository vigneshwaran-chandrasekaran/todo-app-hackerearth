import axios from 'axios';
import { SESSION } from './session';

/**
 * set baseurl for all axios request
 */
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Add a request interceptor
axios.interceptors.request.use(
	(config) => {
		// console.log('request interceptors', config.url);
		// Do something before request is sent
		try {
			if (SESSION.isLoggedIn()) {
				config.headers.Authorization = `Bearer ${SESSION.token}`;
			}
		} catch (error) {
			console.log('catch', error);
		}
		return config;
	},
	(error) => {
		// Do something with request error
		Promise.reject(error);
	}
);

// Add a response interceptor
axios.interceptors.response.use(
	(response) =>
		// console.log('response interceptors', response);
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		response,
	(error) => {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		Promise.reject(error);
	}
);

// axios.create({ withCredentials: false });
export default axios;
