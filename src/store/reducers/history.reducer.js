const initialState = {};

export function history(state = initialState, action) {
	if (action.type === 'SET_HISTORY_RECENT') {
		return { ...state, recentlyVisitedUrl: action.payload };
	} else {
		return state;
	}
}
