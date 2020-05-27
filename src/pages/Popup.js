import React from 'react';
import { Form, Button } from 'antd';

import Admin from '../assets/icon_admin_console.svg';
import Dashboard from '../assets/icon_analytics_dashb.svg';

export function Popup() {
	return (
		<div className="wrapper" style={{ backgroundColor: '#1A1B1C' }}>
			{/* <img className="image" src={Logo} /> */}

			<div>
				<h3 style={{ color: '#FFFFFF', textAlign: 'center' }}>
					Welcome, user !
				</h3>
				<h6 style={{ color: '#FFFFFF', textAlign: 'center' }}>
					Please choose an option below{' '}
				</h6>

				<Form.Item>
					<Button
						style={{
							backgroundColor: '#0091C6',
							color: '#FFFFFF',
							width: '100%',
							height: '55px',
							borderRadius: '10px',
						}}
						htmlType="submit"
						className="login-form-button"
					>
						<img className="admin" src={Admin} alt="Admin" />
						Admin Console
					</Button>
				</Form.Item>

				<Form.Item>
					<Button
						style={{
							backgroundColor: '#67B54B',
							color: '#FFFFFF',
							width: '100%',
							height: '55px',
							borderRadius: '10px',
						}}
						htmlType="submit"
						className="login-form-button"
					>
						<img
							className="dashboard"
							src={Dashboard}
							alt="Dashboard"
						/>
						Analytics Dashboard
					</Button>
				</Form.Item>
			</div>
			<h6
				style={{
					color: '#FFFFFF',
					marginTop: '100px',
					textAlign: 'center',
				}}
			>
				Have another login?
			</h6>
			<Form.Item>
				<Button
					style={{
						backgroundColor: '#FFFFFFD9',
						color: '#151616',
						textAlign: 'center',
						borderRadius: '50px',
					}}
					htmlType="submit"
					className="login-form-button"
				>
					Logout
				</Button>
			</Form.Item>
		</div>
	);
}
