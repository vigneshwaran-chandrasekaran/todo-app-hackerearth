import React, { useEffect } from 'react';
import { SESSION } from '../services';

export default function Dashboard() {
	useEffect(() => {
		console.log('shidi');
		console.log('SESSION', SESSION);
	}, []);

	return <div>Dashboard shidi</div>;
}
