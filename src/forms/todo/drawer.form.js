import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Button } from 'antd';
import { isEmpty } from 'lodash';
import { TodoForm } from '../todo';
import { editTodo } from '../../store/actions/api.actions';

export default function DrawerForm() {
	const [visible, setVisible] = useState(false);

	const [formData, setFormData] = useState({});

	const dispatch = useDispatch();
	const { editTodoData } = useSelector((state) => state.api);

	useEffect(() => {
		if (!isEmpty(editTodoData)) {
			setVisible(true);
			setFormData(editTodoData);
		}
	}, [editTodoData]);

	const showDrawer = () => {
		dispatch(editTodo());
		setVisible(true);
		setFormData({});
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<>
			<Button type="primary" onClick={showDrawer}>
				Drawer Form
			</Button>
			<Drawer
				title="Add new todo"
				width={500}
				placement="right"
				closable={false}
				onClose={onClose}
				visible={visible}
			>
				{/* <TodoForm /> */}
				<TodoForm
					onClose={onClose}
					editMode={!isEmpty(formData)}
					editableTodoData={formData}
				/>
			</Drawer>
		</>
	);
}
