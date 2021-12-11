import React from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Dropdown, message } from 'antd';
import PropTypes from 'prop-types';
import { API } from '../../services';
import { TODO_STATUS } from '../../helpers/constants';
import { updatedTodoList } from '../../store/actions/api.actions';

export default function TodoStatusChange({ data }) {
	const dispatch = useDispatch();

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
			dispatch(updatedTodoList());
		});
	}

	const menu = (
		<Menu onClick={handleStatusEdit}>
			{TODO_STATUS.filter((todo) => todo.id !== data.status).map((todo) => (
				<Menu.Item key={todo.id}>{todo.key}</Menu.Item>
			))}
		</Menu>
	);

	return <Dropdown.Button overlay={menu}>Edit status</Dropdown.Button>;
}

TodoStatusChange.propTypes = {
	data: PropTypes.shape({
		_id: PropTypes.string,
		status: PropTypes.number,
	}),
};
