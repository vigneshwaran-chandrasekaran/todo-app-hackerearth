import React from 'react';
import { Button, Tooltip, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { API } from '../../services';

export default function TodoActionControls({ data }) {
	function handleDeleteTodo() {
		console.log('handleDeleteTodo', data._id);

		const CREDENTIALS = {
			url: `todos/${data._id}`,
			method: 'delete',
		};

		API.common(CREDENTIALS)
			.then((response) => {
				console.log('response', response);
				message.success('Task deleted successfully');
			})
			.finally(() => {});
	}

	return (
		<div className="kanban__box__actions">
			<Popconfirm
				title="Are you sure delete this task?"
				onConfirm={handleDeleteTodo}
				okText="Yes"
				cancelText="No"
			>
				<Button danger icon={<DeleteOutlined />} />
			</Popconfirm>
		</div>
	);
}
