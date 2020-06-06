import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

export default function TodoEdit({ data }) {
	const dispatch = useDispatch();

	return <Button icon={<EditOutlined />} />;
}
