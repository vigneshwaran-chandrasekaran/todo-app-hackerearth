export const userActions = {
	setUser,
};

function setUser(data) {
	return {
		type: 'SET_USER',
		response: data,
	};
}
