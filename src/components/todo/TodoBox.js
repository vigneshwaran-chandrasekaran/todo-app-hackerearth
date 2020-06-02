import React from 'react';
import { TodoActionControls } from '../todo';

export default function TodoBox(props) {
	const { data } = props;
	return (
		<div className="kanban__box">
			<h4>{data.title}</h4>
			<div>{data.description}</div>
			<TodoActionControls {...props} />
		</div>
	);
}
