import React, { useState, useEffect } from 'react';
import { Tag, Divider } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

export default function TodoDate({ data }) {
	const [date, setDate] = useState('Date not available');
	useEffect(() => {
		if (data.dueDate) {
			let date = moment(data.dueDate).format('DD MMM YYYY');
			setDate(date);
		}
	}, [data]);

	return (
		<Tag icon={<ClockCircleOutlined />} color="default">
			{date}
		</Tag>
	);
}
