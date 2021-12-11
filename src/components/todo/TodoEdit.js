import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { EditOutlined } from '@ant-design/icons';
import { editTodo } from '../../store/actions/api.actions';

export default function TodoEdit({ data }) {
	const dispatch = useDispatch();

	function handleEdit() {
		dispatch(editTodo(data));
	}

	return <Button onClick={handleEdit} icon={<EditOutlined />} />;
}

TodoEdit.propTypes = {
	data: PropTypes.shape({
		_id: PropTypes.string,
	}),
};
