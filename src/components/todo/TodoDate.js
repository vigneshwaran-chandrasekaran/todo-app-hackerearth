import React, { useState, useEffect } from 'react';
import { Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

export default function TodoDate({ data }) {
	const [date, setDate] = useState('Date not available');
	useEffect(() => {
		if (data.dueDate) {
			const date = moment(data.dueDate).format('DD MMM YYYY');
			setDate(date);
		}
	}, [data]);

	return (
		<Tag icon={<ClockCircleOutlined />} color="default">
			{date}
		</Tag>
	);
}
