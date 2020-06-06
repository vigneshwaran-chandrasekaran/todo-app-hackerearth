import React from 'react';
import { Tag, Divider } from 'antd';
import { TodoActionControls, TodoLabel } from '../todo';

export default function TodoBox(props) {
	const { data } = props;
	return (
		<div className="kanban__box">
			<h4>
				{data.title} <TodoLabel data={data} />
			</h4>

			<div>{data.description}</div>
			<TodoActionControls {...props} />
		</div>
	);
}
