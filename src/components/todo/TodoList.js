import React, { useState, useEffect } from 'react';
import { API } from '../../services';
import { DeleteTodo, TodoBox, TodoStatus } from '../todo';
import { mapValues, groupBy } from 'lodash';
import { TODO_STATUS } from '../../helpers/constants';

export default function TodoList() {
	const [todos, setTodos] = useState([]);
	const [grouped, setGrouped] = useState([]);

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
		<div className="kanban">
			{TODO_STATUS.map((data) => (
				<div key={data.id} className="kanban__group">
					<TodoStatus data={data} />
					{grouped[data.id] &&
						grouped[data.id].map((todo) => (
							<TodoBox key={todo._id} data={todo} />
						))}
				</div>
			))}
		</div>
	);
}
