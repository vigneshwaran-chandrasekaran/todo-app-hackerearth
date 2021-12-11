import React, { useState, useEffect } from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';
import { TODO_LABEL } from '../../helpers/constants';

export default function TodoLabel({ data }) {
	const [state, setState] = useState({
		color: '',
		key: '',
	});

	useEffect(() => {
		if (data) {
			const obj = TODO_LABEL.find((status) => status.id === data.label);
			if (obj) {
				setState(obj);
			}
		}
	}, [data]);
	return <Tag color={state.color}>{state.key}</Tag>;
}

TodoLabel.propTypes = {
	data: PropTypes.shape({
		label: PropTypes.number,
	}),
};
