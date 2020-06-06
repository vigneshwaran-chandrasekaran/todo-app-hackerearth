import moment from 'moment';

export function timeStamp() {
	return moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
}

export const apiActions = {
	request,
	success,
	failure,
	showLoader,
	hideLoader,
};

function request() {
	return {
		type: 'REQUEST',
	};
}

function success() {
	return {
		type: 'SUCCESS',
	};
}

function failure(error, key) {
	return {
		type: 'FAILURE',
		error: error,
		errorKey: key,
	};
}

function showLoader() {
	return {
		type: 'SHOW_LOADER',
	};
}

function hideLoader() {
	return {
		type: 'HIDE_LOADER',
	};
}

export function updatedTodoList() {
	return {
		type: 'UPDATE_TODO_LIST',
		payload: timeStamp(),
	};
}

export function editTodo(data = {}) {
	// console.log('editTodo', data);
	return {
		type: 'EDIT_TODO',
		payload: data,
	};
}
