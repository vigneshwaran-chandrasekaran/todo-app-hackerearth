import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		console.log(error);
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className="center">
					<h1 className="center p-20 warn gr-bc">
						Sorry something went wrong.
					</h1>
					{/* <Link to="/logout">Logout</Link> */}
				</div>
			);
		}

		return this.props.children;
	}
}
