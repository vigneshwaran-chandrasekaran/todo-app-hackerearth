import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message, Col, Row } from 'antd';
import { Form, Input, DatePicker, Select } from 'formik-antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { API } from '../../services';
import { FormActionButtons } from '../FormActionButtons';
import { TODO_LABEL } from '../../helpers/constants';
import { updatedTodoList } from '../../store/actions/api.actions';

const { Option } = Select;

const TodoSchema = Yup.object({
	title: Yup.string().required('Title required'),
	description: Yup.string().required('Description required'),
	dueDate: Yup.string().required('Duedate required'),
	label: Yup.number().required('Label code required'),
});

const TOMORROW = moment().add(1, 'days');

function TodoForm({ onClose }) {
	const dispatch = useDispatch();
	const { editTodoData } = useSelector((state) => state.api);
	const [dueDate, setDueDate] = useState();
	const [todoLabel, setTodoLabel] = useState();
	const [editMode, setEditMode] = useState(false);
	const [formInitialValues, setFormInitialValues] = useState({});

	useEffect(() => {
		if (!isEmpty(editTodoData)) {
			setEditMode(true);
			setDueDate(moment(editTodoData.dueDate));
		} else {
			setEditMode(false);
		}
	}, [editTodoData]);

	useEffect(() => {
		const formInitialValues = {
			title: editMode ? editTodoData.title : undefined,
			description: editMode ? editTodoData.description : undefined,
			dueDate: editMode ? moment(editTodoData.dueDate) : TOMORROW,
			label: editMode ? editTodoData.label : 1,
		};
		setFormInitialValues(formInitialValues);
	}, [editMode]);

	function handleSubmit(values, { setErrors, resetForm, setSubmitting }) {
		let url = `todos`;

		if (editMode) {
			url = `${url}/${editTodoData._id}`;
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
				dispatch(updatedTodoList());
				showSuccessMessage(values);
				resetForm();
				setTodoLabel(1);
				setDueDate(TOMORROW);
				onClose();
			})
			.finally(() => {
				setSubmitting(false);
			});
	}

	function showSuccessMessage(values) {
		let text = editMode ? 'updated' : 'added';
		message.success(`${values.title} ${text} successfully`);
	}

	return (
		// `enableReinitialize` will solve the form not updating issue
		<Formik
			enableReinitialize
			initialValues={formInitialValues}
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
									name="label"
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
						onClose={onClose}
						isSubmitting={isSubmitting}
					/>
				</Form>
			)}
		</Formik>
	);
}

TodoForm.propTypes = {
	// onClose: PropTypes.func.isRequired,
};

export { TodoForm };
