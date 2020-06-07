import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Card, Typography } from 'antd';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';
import jsSha512 from 'js-sha512';
import { API, SESSION } from '../services';
import { useIsMounted } from '../hooks';

const { Title } = Typography;

const LoginSchema = Yup.object({
	email: Yup.string().email().required('Email required'),
	password: Yup.string().required('Password required'),
});

// const initialValues = {
// 	email: 'todo@gmail.com',
// 	password: 'password',
// };

const initialValues = {
	email: undefined,
	password: undefined,
};

export function Login() {
	const history = useHistory();
	const isMounted = useIsMounted();

	function LoginForm(values, { setErrors, setSubmitting, resetForm }) {
		let newVal = {
			email: values.email,
			password: jsSha512(values.password),
		};

		const CREDENTIALS = {
			url: `users/login `,
			method: 'post',
			data: newVal,
			setErrors,
		};

		API.common(CREDENTIALS).then((response) => {
			if (isMounted) {
				handleLoginSuccess(response);
				resetForm({});
				setSubmitting(false);
				redirectingToDoPage();
			}
		});
	}

	function handleLoginSuccess(response) {
		const data = response.data;
		SESSION.setToken(data);
	}

	function redirectingToDoPage() {
		history.push('/todo');
	}

	return (
		<Row justify="center" align="middle" style={{ paddingTop: '75px' }}>
			<Col span={6} xs={24} md={12} lg={6}>
				<Card className="login-box">
					<Title className="center" level={2}>
						Login
					</Title>
					<p className="center" style={{ marginBottom: '30px' }}>
						Enter your details below.
					</p>
					<Formik
						initialValues={initialValues}
						validationSchema={LoginSchema}
						onSubmit={LoginForm}
					>
						{({ isSubmitting }) => (
							<Form>
								<Row gutter={8}>
									<Col span={24}>
										<Form.Item
											name="email"
											hasFeedback={true}
											showValidateSuccess={true}
										>
											<Input
												name="email"
												placeholder="Enter Email ID"
											/>
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={8}>
									<Col span={24}>
										<Form.Item
											name="password"
											hasFeedback={true}
											showValidateSuccess={true}
										>
											<Input.Password
												name="password"
												placeholder="Type Your Password"
											/>
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={8}>
									<Col span={24} className="center">
										<SubmitButton
											data-testid="form-save-btn"
											type="primary"
											disabled={isSubmitting}
											className="login-btn"
										>
											Login
										</SubmitButton>
									</Col>
								</Row>
								<Row gutter={8}>
									<Col
										span={24}
										className="right-align mt-20"
									>
										<Link
											className="forgot-link"
											to="/signup"
										>
											Signup
										</Link>
									</Col>
								</Row>
							</Form>
						)}
					</Formik>
				</Card>
			</Col>
		</Row>
	);
}

export default Login;
