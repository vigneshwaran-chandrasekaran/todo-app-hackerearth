import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { API } from '../../services';

export default function TodoDelete({ data }) {
	function handleDeleteTodo() {
		const CREDENTIALS = {
			url: `todos/${data._id}`,
			method: 'delete',
		};

		API.common(CREDENTIALS).then(() => {
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
