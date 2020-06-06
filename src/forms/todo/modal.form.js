import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'antd';
import { isEmpty } from 'lodash';
import { TodoForm } from '../todo';
import { editTodo } from '../../store/actions/api.actions';

export default function ModalForm() {
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);
	const { editTodoData } = useSelector((state) => state.api);

	useEffect(() => {
		if (!isEmpty(editTodoData)) {
			setVisible(true);
		}
	}, [editTodoData]);

	const showModal = () => {
		dispatch(editTodo());
		setVisible(true);
	};

	const handleOk = (e) => {
		setVisible(false);
	};

	const handleCancel = (e) => {
		setVisible(false);
	};

	return (
		<div>
			<Button type="primary" onClick={showModal}>
				Add new todo
			</Button>
			<Modal
				title="Add new todo"
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<TodoForm
					onClose={handleOk}
					editMode={!isEmpty(editTodoData)}
					editableTodoData={editTodoData}
				/>
			</Modal>
		</div>
	);
}
