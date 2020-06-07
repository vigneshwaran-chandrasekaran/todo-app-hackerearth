import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'antd';
import { isEmpty } from 'lodash';
import { TodoForm } from '../todo';
import { editTodo } from '../../store/actions/api.actions';

export default function ModalForm() {
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
			<Modal
				title="Todo"
				visible={visible}
				onCancel={onClose}
				footer={null}
			>
				<TodoForm onClose={onClose} />
			</Modal>
		</div>
	);
}
