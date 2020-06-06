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
import { TODO_LABEL } from '../../helpers/constants';

const { Option } = Select;

const TodoSchema = Yup.object({
	title: Yup.string().required('Title required'),
	description: Yup.string().required('Description required'),
	dueDate: Yup.string().required('Duedate required'),
	label: Yup.number().required('Label code required'),
});

const TOMORROW = moment().add(1, 'days');

function TodoForm({ onClose, editMode, editableTodo }) {
	const dispatch = useDispatch();
	const [dueDate, setDueDate] = useState();
	const [todoLabel, setTodoLabel] = useState();

	const initialValues = {
		title: editMode ? editableTodo.title : undefined,
		description: editMode ? editableTodo.description : undefined,
		dueDate: editMode ? editableTodo.phone : TOMORROW,
		label: editMode ? editableTodo.label : 3,
	};

	function handleSubmit(values, { setErrors, resetForm, setSubmitting }) {
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
				setTodoLabel(1);
				setDueDate(TOMORROW);
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
										console.log('setTodoLabel', data);
										setTodoLabel(data);
										setFieldValue('label', data);
									}}
								>
									{TODO_LABEL.map(({ id, key }) => (
										<Option key={id} value={id}>
											{key}
										</Option>
									))}
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
