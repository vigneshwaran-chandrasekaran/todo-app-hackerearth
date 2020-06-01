import React, { useState, useEffect } from 'react';
import { API } from '../../services';
import { DeleteTodo } from '../todo';
import _ from 'lodash';

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

				let grouped = _.mapValues(_.groupBy(response.data, 'label'));

				console.log('grouped', grouped);
				setGrouped(grouped);
			})
			.finally(() => {});
	}, []);

	return (
		<div>
			<p>table</p>
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
							{values.map((data) => (
								<div key={data._id} className="kanban__box">
									<h4>{data.title}</h4>
									<div>{data.description}</div>
								</div>
							))}
						</div>
					))}
			</div>
		</div>
	);
}
