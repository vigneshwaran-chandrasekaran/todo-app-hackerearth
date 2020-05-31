import React from 'react';
import { API } from '../../services';

export default function DeleteTodo({ data }) {
	function handleDeleteTodo() {
		console.log('handleDeleteTodo', data._id);

		const CREDENTIALS = {
			url: `todos/${data._id}`,
			method: 'delete',
		};

		API.common(CREDENTIALS)
			.then((response) => {
				console.log('response', response);
				alert('delete doneS');
			})
			.finally(() => {});
	}
	return (
		<div>
			<button onClick={handleDeleteTodo}>{data.status}</button>
		</div>
	);
}
