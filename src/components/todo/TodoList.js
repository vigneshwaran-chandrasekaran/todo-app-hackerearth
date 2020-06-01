import React, { useState, useEffect } from 'react';
import { API } from '../../services';
import { DeleteTodo } from '../todo';

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
				<table className="todo__list__table">
					{todos.map((data) => (
						<tr key={data._id}>
							<td>
								<div>{data.title}</div>
								<div>{data.description}</div>
							</td>
							<td>
								<DeleteTodo data={data} />
							</td>
						</tr>
					))}
				</table>
			)}
		</div>
	);
}
