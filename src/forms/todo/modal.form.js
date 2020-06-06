import React, { useState } from 'react';
import { Modal, Button } from 'antd';
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
					Modal Form
				</Button>
				<Modal
					title="Add new todo"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					footer={null}
				>
					<TodoForm />
				</Modal>
			</div>
		);
	}
}
