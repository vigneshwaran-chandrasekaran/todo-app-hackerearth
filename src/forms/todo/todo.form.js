import { Col, message, Row } from 'antd';
import { Formik } from 'formik';
import { DatePicker, Form, Input, Select } from 'formik-antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { TODO_LABEL } from '../../helpers/constants';
import { API } from '../../services';
import { updatedTodoList } from '../../store/actions/api.actions';
import { FormActionButtons } from '../FormActionButtons';

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
		try {
			if (!isEmpty(editTodoData)) {
				setEditMode(true);
				setDueDate(moment(editTodoData.dueDate));
			} else {
				setEditMode(false);
			}
		} catch (error) {
			console.log('error', error);
		}
	}, [editTodoData]);

	useEffect(() => {
		try {
			const formData = {
				title: editMode ? editTodoData.title : undefined,
				description: editMode ? editTodoData.description : undefined,
				dueDate: editMode ? moment(editTodoData.dueDate) : TOMORROW,
				label: editMode ? editTodoData.label : 1,
			};
			setFormInitialValues(formData);
		} catch (error) {
			console.log('error', error);
		}
	}, [editMode, editTodoData]);

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
				dueDate: moment(values.dueDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
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
		const text = editMode ? 'updated' : 'added';
		message.success(`${values.title} ${text} successfully`);
	}

	// `enableReinitialize` will solve the form not updating issue

	return (
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
							<Form.Item name="title" label="Title" hasFeedback showValidateSuccess>
								<Input name="title" placeholder="Title" />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={8}>
						<Col span={24}>
							<Form.Item
								name="description"
								label="Description"
								hasFeedback
								showValidateSuccess
							>
								<Input name="description" placeholder="Description" />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Form.Item
								name="dueDate"
								label="Duedate"
								hasFeedback
								showValidateSuccess
							>
								<DatePicker
									value={dueDate}
									name="dueDate"
									onChange={(date, dateString) => {
										setDueDate(date);
										setFieldValue('dueDate', dateString);
									}}
									format="DD-MM-YYYY"
									disabledDate={(current) => current && current < moment()}
									style={{ width: '100%' }}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={8}>
						<Col span={24}>
							<Form.Item name="label" label="Label" hasFeedback showValidateSuccess>
								<Select
									showSearch
									name="label"
									style={{ width: '100%' }}
									placeholder="Select label"
									allowClear
									optionFilterProp="children"
									onChange={(data) => {
										console.log('setTodoLabel', data);
										console.log('todoLabel', todoLabel);
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

					<FormActionButtons onClose={onClose} isSubmitting={isSubmitting} />
				</Form>
			)}
		</Formik>
	);
}

TodoForm.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export { TodoForm };
