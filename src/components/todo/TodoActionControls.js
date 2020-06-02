import React from 'react';
import { TodoStatusChange, TodoDelete } from '../todo';

export default function TodoActionControls(props) {
	return (
		<div className="kanban__box__actions">
			<TodoStatusChange {...props} />
			<TodoDelete {...props} />
		</div>
	);
}
