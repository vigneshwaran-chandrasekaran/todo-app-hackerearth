import React from 'react';
import PropTypes from 'prop-types';

export default function TodoStatus({ data }) {
	return <div className="title-label">{data.key}</div>;
}

TodoStatus.propTypes = {
	data: PropTypes.shape({
		key: PropTypes.string,
	}),
};
