import React, { useState, useEffect } from 'react';
import { Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import PropTypes from 'prop-types';

export default function TodoDate({ data }) {
	const [date, setDate] = useState('Date not available');
	useEffect(() => {
		if (data.dueDate) {
			const dateNew = moment(data.dueDate).format('DD MMM YYYY');
			setDate(dateNew);
		}
	}, [data]);

	return (
		<Tag icon={<ClockCircleOutlined />} color="default">
			{date}
		</Tag>
	);
}

TodoDate.propTypes = {
	data: PropTypes.shape({
		dueDate: PropTypes.string,
		description: PropTypes.string,
	}),
};
