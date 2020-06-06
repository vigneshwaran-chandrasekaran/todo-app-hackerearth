import React from 'react';
import { Menu, Dropdown, message } from 'antd';
import { API } from '../../services';
import { TODO_STATUS } from '../../helpers/constants';

export default function TodoStatusChange({ data }) {
	function handleStatusEdit(e) {
		const CREDENTIALS = {
			url: `todos/${data._id}`,
			data: {
				status: e.key,
			},
			method: 'patch',
		};

		API.common(CREDENTIALS).then(() => {
			message.success('Task status changed successfully');
		});
	}

	const menu = (
		<Menu onClick={handleStatusEdit}>
			{TODO_STATUS.map((data) => (
				<Menu.Item key={data.id}>{data.key}</Menu.Item>
			))}
		</Menu>
	);

	return <Dropdown.Button overlay={menu}>Edit status</Dropdown.Button>;
}
