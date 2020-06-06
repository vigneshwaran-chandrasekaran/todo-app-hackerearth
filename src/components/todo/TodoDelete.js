import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { API } from '../../services';
import { updatedTodoList } from '../../store/actions/api.actions';

export default function TodoDelete({ data }) {
	const dispatch = useDispatch();

	function handleDeleteTodo() {
		const CREDENTIALS = {
			url: `todos/${data._id}`,
			method: 'delete',
		};

		API.common(CREDENTIALS).then(() => {
			dispatch(updatedTodoList());
			message.success('Task deleted successfully');
		});
	}

	return (
		<Popconfirm
			title="Are you sure delete this task?"
			onConfirm={handleDeleteTodo}
			okText="Yes"
			cancelText="No"
			className="kanban__box__actions__delete"
		>
			<Button danger icon={<DeleteOutlined />} />
		</Popconfirm>
	);
}
