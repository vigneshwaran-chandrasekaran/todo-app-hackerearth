import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message, Col, Row, Select } from 'antd';
import { Form, Input, DatePicker } from 'formik-antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import moment from 'moment';

import { API } from '../../services';
import { FormActionButtons } from '../FormActionButtons';
import { TODO_LABEL } from '../../helpers/';

const { Option } = Select;

const TodoSchema = Yup.object({
	title: Yup.string().required('Title required'),
	description: Yup.string().required('Description required'),
	dueDate: Yup.string().required('Duedate required'),
	label: Yup.number().required('Label code required'),
});

function TodoForm({ onClose, editMode, editableTodo }) {
	const dispatch = useDispatch();
	const [dueDate, setDueDate] = useState();

	const initialValues = {
		title: editMode ? editableTodo.title : undefined,
		description: editMode ? editableTodo.description : undefined,
		dueDate: editMode ? editableTodo.phone : moment(),
		label: editMode ? editableTodo.label : 3,
	};

	function handleSubmit(values, { setErrors, resetForm, setSubmitting }) {
		/**
		 * below two keys no needed for post call
		 */

		// let data = {
		// 	...values,
		// 	phone: values.phone.toString(),
		// };
		console.log('values visit', values);

		let url = `todos`;

		if (editMode) {
			url = `${url}/${editableTodo._id}`;
		}

		const CREDENTIALS = {
			url,
			method: editMode ? 'put' : 'post',
			data: {
				...values,
				dueDate: moment(values.dueDate, 'DD-MM-YYYY').format(
					'YYYY-MM-DD'
				),
			},
			setErrors,
		};

		API.common(CREDENTIALS)
			.then(() => {
				showSuccessMessage(values);
				resetForm();
			})
			.finally(() => {
				setSubmitting(false);
			});
	}

	function showSuccessMessage(values) {
		let text = editMode ? 'updated' : 'added';
		message.success(`${values.title} todo ${text} successfully`);
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={TodoSchema}
			onSubmit={handleSubmit}
		>
			{({ isSubmitting, setFieldValue }) => (
				<Form layout="vertical" hideRequiredMark>
					<Row gutter={8}>
						<Col span={24}>
							<Form.Item
								name="title"
								label="Title"
								hasFeedback={true}
								showValidateSuccess={true}
							>
								<Input name="title" placeholder="Title" />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={8}>
						<Col span={24}>
							<Form.Item
								name="description"
								label="Description"
								hasFeedback={true}
								showValidateSuccess={true}
							>
								<Input
									name="description"
									placeholder="Description"
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							{/* <label className="ant-form-item-label">
								Duedate
							</label> */}
							<Form.Item
								name="dueDate"
								label="Duedate"
								hasFeedback={true}
								showValidateSuccess={true}
							>
								<DatePicker
									value={dueDate}
									name="dueDate"
									onChange={(date, dateString) => {
										setDueDate(date);
										setFieldValue('dueDate', dateString);
									}}
									format="DD-MM-YYYY"
									disabledDate={(current) => {
										return current && current < moment();
									}}
									style={{ width: '100%' }}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={8}>
						<Col span={24}>
							<Form.Item
								name="label"
								label="Label"
								hasFeedback={true}
								showValidateSuccess={true}
							>
								<Select
									showSearch
									name="Label"
									style={{ width: '100%' }}
									placeholder={'Select label'}
									allowClear={true}
									optionFilterProp="children"
									onChange={(data) => {
										setFieldValue('label', data);
									}}
									filterOption={(input, option) =>
										option.props.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
								>
									<Option key={1} value={1}>
										PERSONAL
									</Option>
									<Option key={2} value={2}>
										WORK
									</Option>
									<Option key={3} value={3}>
										SHOPPING
									</Option>
									<Option key={4} value={4}>
										OTHER
									</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<FormActionButtons
						// onClose={onClose}
						isSubmitting={isSubmitting}
					/>
				</Form>
			)}
		</Formik>
	);
}

TodoForm.propTypes = {
	// editMode: PropTypes.bool.isRequired,
	// onClose: PropTypes.func.isRequired,
};

export { TodoForm };
