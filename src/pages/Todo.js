import React from 'react';
import { TodoForm } from '../forms/todo';
import { TodoList } from '../components/todo';

export default function Todo() {
	return (
		<div>
			<TodoForm />
			<TodoList />
		</div>
	);
}
