import qs from 'qs';
import { message as toaster } from 'antd';
import { isArray } from 'lodash';
import axios from './api.config';
import { apiActions } from '../store/actions';
import store from '../store/configureStore';
import { SESSION } from './session';

class ApiRequestClass {
	// constructor() {
	// 	console.log('instance', ApiRequestClass.instance, this);
	// }
	/**
	 *
	 * @param {string} url
	 * @param {object} data
	 * @param {boolean} showLoader
	 * @param {string} method - must be a lowercase, it's axios get, post, delete, patch methods
	 * @param {object} queryParams
	 */
	async common({
		url,
		data = {},
		showLoading = true,
		method = 'get',
		queryParams = {},
		setErrors,
	}) {
		if (showLoading) {
			this.handleShowLoader();
		}

		try {
			const URL = this.addQueryParamsWithUrl(url, queryParams);
			const response = await axios[method](URL, data);
			return Promise.resolve(response.data);
		} catch (error) {
			this.handleErrors(error, setErrors);
			return Promise.reject(error);
		} finally {
			this.handleHideLoader();
		}
	}

	addQueryParamsWithUrl(url, queryParams) {
		Object.keys(queryParams).forEach(
			(key) =>
				(queryParams[key] === null || queryParams[key] === '') && delete queryParams[key]
		);
		return url + qs.stringify(queryParams, { addQueryPrefix: true });
	}

	handleErrors(error, setErrors) {
		if (error) {
			try {
				const { data } = error.response;
				const { status } = error.response;
				const checkNetworkError = JSON.stringify(error);
				const NetworkError = 'Network Error';

				if (checkNetworkError.includes(NetworkError)) {
					toaster.error(NetworkError);
					return false;
				}
				if (status === 500) {
					toaster.error(error.message);
				} else if (status === 400) {
					toaster.error(data.message);
				} else if (status === 401) {
					/**
					 * 401 is authentication error like session failure
					 */
					toaster.error('Session expired');

					setTimeout(() => {
						SESSION.logout();
					}, 1000);
				} else if (status === 422) {
					/**
					 * 422 error is form validation error
					 */
					this.handle422Error(error, setErrors);
				} else {
					this.handleCommonErrors(data);
				}
			} catch (e) {
				toaster.error('Something went wrong please try again');
				console.log('Unhandled error', e);
			}
		}
		return null;
	}

	handleCommonErrors(data) {
		const error = data.errors.message;
		const errors = data.errors.messages;
		if (error) {
			if (isArray(error)) {
				toaster.error(error[0]);
			} else if (!isArray(error)) {
				toaster.error(error);
			}
		} else if (errors) {
			if (isArray(errors)) {
				toaster.error(errors[0]);
			} else if (!isArray(errors)) {
				toaster.error(errors);
			}
		}
	}

	handleShowLoader() {
		store.dispatch(apiActions.showLoader());
		store.dispatch({
			type: 'INCREMENT_LOADER_COUNTER',
		});
	}

	handleHideLoader() {
		store.dispatch(apiActions.hideLoader());
		store.dispatch({
			type: 'DECREMENT_LOADER_COUNTER',
		});
	}

	handle422Error(error, setErrors) {
		const serverErrors = error.response.data.errors.message
			? error.response.data.errors.message
			: error.response.data.errors.messages;
		console.log('422 Error', serverErrors);
		if (serverErrors?.length > 0) {
			const [serverErrorsObj] = serverErrors;
			const errorKeys = {};
			Object.keys(serverErrorsObj).forEach((key) => {
				// eslint-disable-next-line prefer-destructuring
				errorKeys[key] = serverErrorsObj[key][0];
			});
			setErrors(errorKeys);
		} else {
			toaster.error(error.response.data.errors.messages[0]);
		}
		return null;
	}
}

export const API = new ApiRequestClass();
