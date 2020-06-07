import React, { useEffect } from 'react';
import { SESSION } from '../services';

export default function Logout() {
	useEffect(() => {
		SESSION.logout();
	}, []);

	return <div>Logout</div>;
}
