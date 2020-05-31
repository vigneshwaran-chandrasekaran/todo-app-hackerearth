import React, { useState, useEffect } from 'react';
import { API } from '../../services';

export default function TodoList() {
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		const CREDENTIALS = {
			url: `todos`,
			method: 'get',
		};

		API.common(CREDENTIALS)
			.then((response) => {
				console.log('response', response);
				setTodos(response.data);
			})
			.finally(() => {});
	}, []);

	return (
		<div>
			<p>table</p>
			{todos && todos.length > 0 && (
				<table>
					{todos.map((data) => (
						<tr key={data._id}>
							<td>{data.title}</td>
							<td>{data.description}</td>
							<td>{data.status}</td>
						</tr>
					))}
				</table>
			)}
		</div>
	);
}
