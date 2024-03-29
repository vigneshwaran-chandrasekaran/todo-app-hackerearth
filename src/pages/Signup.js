import React from 'react';
import { Row, Col, message, Card, Typography } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, SubmitButton } from 'formik-antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import jsSha512 from 'js-sha512';
import { API } from '../services/api.request';

const { Title } = Typography;

const SignupScheme = Yup.object({
	email: Yup.string().email().required('Email required'),
	password: Yup.string().required('Password required'),
	firstName: Yup.string().required('Firstname required'),
	lastName: Yup.string().required('Lastname required'),
});

export function Signup() {
	const history = useHistory();

	// const initialValues = {
	// 	email: 'todo@gmail.com',
	// 	password: 'password',
	// 	firstName: 'Vigneshwaran',
	// 	lastName: 'C',
	// };

	const initialValues = {
		email: undefined,
		password: undefined,
		firstName: undefined,
		lastName: undefined,
	};

	function handleSignup(values, { setErrors, setSubmitting }) {
		const { password } = values;
		const CREDENTIALS = {
			url: `/users`,
			method: 'post',
			data: { ...values, password: jsSha512(password) },
			setErrors,
		};

		API.common(CREDENTIALS)
			.then(() => {
				showSuccessMessage();
			})
			.finally(() => {
				setSubmitting(false);
			});
	}

	function showSuccessMessage() {
		message.success(`Signup done. Redirecting to login...`);
		redirectToLogin();
	}

	function redirectToLogin() {
		setTimeout(() => {
			history.push('/');
		}, 3000);
	}

	return (
		<Row justify="center" align="middle" style={{ paddingTop: '75px' }}>
			<Col span={6}>
				<Card className="login-box">
					<Title className="center" level={2}>
						Signup
					</Title>
					<p className="center" style={{ marginBottom: '30px' }}>
						Enter your details below.
					</p>

					<Formik
						initialValues={initialValues}
						validationSchema={SignupScheme}
						onSubmit={handleSignup}
					>
						{({ isSubmitting }) => (
							<Form>
								<Row gutter={8}>
									<Col span={24}>
										<Form.Item name="email" hasFeedback showValidateSuccess>
											<Input name="email" placeholder=" Enter Email ID" />
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={8}>
									<Col span={24}>
										<Form.Item name="password" hasFeedback showValidateSuccess>
											<Input.Password
												name="password"
												placeholder="Type Your Password"
											/>
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={8}>
									<Col span={24}>
										<Form.Item name="firstName" hasFeedback showValidateSuccess>
											<Input name="firstName" placeholder="Firstname" />
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={8}>
									<Col span={24}>
										<Form.Item name="lastName" hasFeedback showValidateSuccess>
											<Input name="lastName" placeholder="Lastname" />
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
											Signup
										</SubmitButton>
									</Col>
								</Row>

								<Row gutter={8}>
									<Col span={24} className="right-align mt-20">
										<Link className="forgot-link" to="/">
											Back to login
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

export default Signup;
