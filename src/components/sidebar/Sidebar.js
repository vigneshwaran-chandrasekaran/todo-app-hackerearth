import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import { PoweroffOutlined, HighlightOutlined } from '@ant-design/icons';
import { findUrlPathId, handleLogout } from './Sidebar.controller';

const { Sider } = Layout;

function Sidebar(props) {
	const [collapsed, setCollapsed] = useState(false);
	const [key, setKey] = useState();

	useEffect(() => {
		const path = props.location.pathname;
		const pathId = findUrlPathId(path);
		setKey(pathId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.location.pathname]);

	function onCollapse(collapsed) {
		setCollapsed(collapsed);
	}

	return (
		<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
			<>
				<Menu theme="dark" mode="inline" defaultSelectedKeys={[key]} selectedKeys={[key]}>
					<Menu.Item key="1">
						<NavLink to="/todo" />
						<HighlightOutlined />
						<span>Todo</span>
					</Menu.Item>

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
