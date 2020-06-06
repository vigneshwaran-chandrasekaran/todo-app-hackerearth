import React from 'react';

export default function TodoStatus({ data }) {
	return <div className="title-label">{data.key}</div>;
}
