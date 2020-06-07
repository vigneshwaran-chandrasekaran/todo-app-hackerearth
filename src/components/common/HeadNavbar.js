import React from 'react';
import { Menu, Row, Col } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { SESSION } from '../../services';

const { SubMenu } = Menu;

export default function HeadNavbar() {
	const handleClick = (e) => {
		console.log('click ', e);
		if (e.key === 'logout') {
			SESSION.logout();
		}
	};

	return (
		<Row justify="end" align="center">
			<Col span={24}>
				<Menu onClick={handleClick} mode="horizontal">
					<SubMenu
						icon={<UserOutlined />}
						title="Profile"
						style={{ float: 'right' }}
					>
						<Menu.Item icon={<LogoutOutlined />} key="logout">
							Logout
						</Menu.Item>
					</SubMenu>
				</Menu>
			</Col>
		</Row>
	);
}
