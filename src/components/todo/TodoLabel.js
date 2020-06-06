import React, { useState, useEffect } from 'react';
import { TODO_STATUS } from '../../helpers/constants';

export default function TodoLabel({ data }) {
	const [label, setLabel] = useState('');

	useEffect(() => {
		if (data) {
			let obj = TODO_STATUS.find((status) => status.id === data.status);
			if (obj) {
				setLabel(obj.key);
			}
		}
	}, [data]);

	return <div className="title-label">{label}</div>;
}
