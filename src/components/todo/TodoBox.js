import React from 'react';
import PropTypes from 'prop-types';
import { TodoDate, TodoActionControls, TodoLabel } from '.';

export default function TodoBox(props) {
	const { data } = props;
	return (
		<div className="kanban__box">
			<h4>{data.title}</h4>
			<div className="todo-date-label">
				<TodoDate data={data} /> <TodoLabel data={data} />
			</div>
			<div>{data.description}</div>
			<TodoActionControls {...props} />
		</div>
	);
}

TodoBox.propTypes = {
	data: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
	}),
};
