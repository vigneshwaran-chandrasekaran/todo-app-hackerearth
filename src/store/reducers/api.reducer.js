const initialState = {
	showLoader: false,
	status: null,
	notification: null,
	loaderCount: 0,
};

export function api(state = initialState, action) {
	switch (action.type) {
		case 'REQUEST':
			return { ...state, status: 'requestStart', showLoader: true };
		case 'SUCCESS':
			return { ...state, status: 'requestSuccess', showLoader: false };
		case 'FAILURE':
			return { ...state, status: 'requestFailure', showLoader: false };
		case 'SHOW_LOADER':
			return { ...state, showLoader: true };
		case 'HIDE_LOADER':
			return { ...state, showLoader: false };
		case 'INCREMENT_LOADER_COUNTER':
			return { ...state, loaderCount: state.loaderCount + 1 };
		case 'DECREMENT_LOADER_COUNTER':
			return { ...state, loaderCount: state.loaderCount - 1 };
		case 'NOTIFICATION_REF':
			return { ...state, notification: action.reference };
		default:
			return state;
	}
}
