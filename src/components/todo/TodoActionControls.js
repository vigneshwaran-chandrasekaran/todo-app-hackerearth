import React from 'react';
import { TodoStatusChange, TodoDelete, TodoEdit } from '.';

export default function TodoActionControls(props) {
	return (
		<div className="kanban__box__actions">
			<TodoStatusChange {...props} />
			<TodoEdit {...props} />
			<TodoDelete {...props} />
		</div>
	);
}
