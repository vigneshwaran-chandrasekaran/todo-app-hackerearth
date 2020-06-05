import React, { useState } from 'react';
import { Drawer, Modal, Button } from 'antd';
import { TodoForm } from '../todo';

export default class App extends React.Component {
	state = { visible: false };

	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleOk = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	render() {
		return (
			<div>
				<Button type="primary" onClick={this.showModal}>
					Open Modal
				</Button>
				<Modal
					title="Basic Modal"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<TodoForm />
				</Modal>
			</div>
		);
	}
}
