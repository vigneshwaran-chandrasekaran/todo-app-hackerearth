import React from 'react';
import { Row, Col } from 'antd';
import { ModalForm, DrawerForm, TodoForm } from '../forms/todo';
import { TodoList } from '../components/todo';

export default function Todo() {
	function onClose() {
		console.log('onClose');
	}

	return (
		<div className="main-layout">
			<Row gutter={8} justify={'center'}>
				<Col span={8}>
					<TodoForm onClose={onClose} />
				</Col>
			</Row>

			<Row gutter={8} justify={'end'}>
				<Col>
					<ModalForm />
				</Col>
				{/* <Col>
					<DrawerForm />
				</Col> */}
			</Row>
			<TodoList />
		</div>
	);
}
