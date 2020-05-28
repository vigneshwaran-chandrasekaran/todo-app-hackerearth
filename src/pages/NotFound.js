import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Result, Button } from 'antd';

export function NotFound() {
	const history = useHistory();
	const { recentlyVisitedUrl } = useSelector(state => state.history);

	function handleGoBack() {
		history.push(recentlyVisitedUrl);
	}

	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Button type="primary" onClick={handleGoBack}>
					Back to previous page
				</Button>
			}
		/>
	);
}
