import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { PoweroffOutlined, HighlightOutlined } from '@ant-design/icons';
import { findUrlPathId, handleLogout } from './Sidebar.controller';

const { Sider } = Layout;

function Sidebar({ location }) {
	const [collapsed, setCollapsed] = useState(false);
	const [key, setKey] = useState();

	useEffect(() => {
		const { pathname } = location;
		const pathId = findUrlPathId(pathname);
		setKey(pathId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);

	function onCollapse(data) {
		setCollapsed(data);
	}

	return (
		<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
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
		</Sider>
	);
}

Sidebar.propTypes = {
	location: PropTypes.object,
};

export default withRouter(Sidebar);
