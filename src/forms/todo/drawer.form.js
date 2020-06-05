import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { TodoForm } from '../todo';

export default function DrawerForm() {
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<>
			<Button type="primary" onClick={showDrawer}>
				Drawer Form
			</Button>
			<Drawer
				title="Add new Todo"
				width={720}
				placement="right"
				closable={false}
				onClose={onClose}
				visible={visible}
			>
				<TodoForm />
			</Drawer>
		</>
	);
}
