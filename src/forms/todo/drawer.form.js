import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Button } from 'antd';
import { isEmpty } from 'lodash';
import { TodoForm } from '.';
import { editTodo } from '../../store/actions/api.actions';

export default function DrawerForm() {
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch();
	const { editTodoData } = useSelector((state) => state.api);

	useEffect(() => {
		if (!isEmpty(editTodoData)) {
			setVisible(true);
		}
	}, [editTodoData]);

	const showForm = () => {
		dispatch(editTodo());
		setVisible(true);
	};

	const onClose = () => {
		dispatch(editTodo());
		setVisible(false);
	};

	return (
		<div>
			<Button type="primary" onClick={showForm}>
				Add new todo
			</Button>
			<Drawer
				title="Todo"
				width={500}
				placement="right"
				closable={false}
				onClose={onClose}
				visible={visible}
			>
				<TodoForm onClose={onClose} />
			</Drawer>
		</div>
	);
}
