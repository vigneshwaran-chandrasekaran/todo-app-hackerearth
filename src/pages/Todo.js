import React from 'react';
import { Row, Col } from 'antd';
import { ModalForm, DrawerForm } from '../forms/todo';
import { TodoList } from '../components/todo';

export default function Todo() {
	return (
		<div className="main-layout">
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
