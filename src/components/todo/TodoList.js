import React, { useState, useEffect } from 'react';
import { API } from '../../services';
import { DeleteTodo, TodoBox, TodoLabel } from '../todo';
import { mapValues, groupBy } from 'lodash';

export default function TodoList() {
	const [todos, setTodos] = useState([]);
	const [grouped, setGrouped] = useState();

	useEffect(() => {
		const CREDENTIALS = {
			url: `todos`,
			queryParams: {
				all: true,
			},
			method: 'get',
		};

		API.common(CREDENTIALS)
			.then((response) => {
				console.log('response', response);
				setTodos(response.data);

				let grouped = mapValues(groupBy(response.data, 'status'));

				console.log('grouped', grouped);
				setGrouped(grouped);
			})
			.finally(() => {});
	}, []);

	return (
		<div>
			{/* {todos && todos.length > 0 && (
				<table className="todo__list__table">
					<tbody>
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
					</tbody>
				</table>
			)} */}
			<div className="kanban">
				{grouped &&
					Object.entries(grouped).map(([key, values], i) => (
						<div key={i} className="kanban__group">
							<TodoLabel data={values[0]} />
							{values.map((data) => (
								<TodoBox key={data._id} data={data} />
							))}
						</div>
					))}
			</div>
		</div>
	);
}
