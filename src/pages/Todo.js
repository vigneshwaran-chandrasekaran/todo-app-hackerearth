import React from 'react';
import { CreateForm, DrawerForm, TodoForm } from '../forms/todo';
import { TodoList } from '../components/todo';

export default function Todo() {
	return (
		<div className="main-layout">
			<CreateForm />
			<DrawerForm />
			<TodoForm />
			<TodoList />
		</div>
	);
}
