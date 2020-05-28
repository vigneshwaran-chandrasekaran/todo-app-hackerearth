import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import {
	PoweroffOutlined,
	FormOutlined,
	HighlightOutlined,
} from '@ant-design/icons';
import { SESSION } from '../../services';

const { Sider } = Layout;
const { SubMenu } = Menu;

export function findUrlPathId(path) {
	switch (path) {
		case '/input':
			return '2';
		case '/dropdown':
			return '3';
		default:
			return '1';
	}
}

function Sidebar(props) {
	const [collapsed, setCollapsed] = useState(false);
	const [key, setKey] = useState();

	useEffect(() => {
		let path = props.location.pathname;
		const pathId = findUrlPathId(path);
		setKey(pathId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.location.pathname]);

	function onCollapse(collapsed) {
		setCollapsed(collapsed);
	}

	const handleLogout = () => {
		SESSION.logout();
	};

	return (
		<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
			<>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={[key]}
					selectedKeys={[key]}
				>
					<SubMenu
						key="sub2"
						title={
							<span>
								<FormOutlined />
								<span>Forms</span>
							</span>
						}
					>
						<Menu.Item key="2">
							<NavLink to="/input" />
							<HighlightOutlined />
							<span>Input</span>
						</Menu.Item>
						<Menu.Item key="3">
							<NavLink to="/dropdown" />
							<HighlightOutlined />
							<span>Dropdown</span>
						</Menu.Item>
					</SubMenu>
					<Menu.Item key="4" onClick={handleLogout}>
						<PoweroffOutlined />
						<span>Log Out</span>
					</Menu.Item>
				</Menu>
			</>
		</Sider>
	);
}

export default withRouter(Sidebar);
