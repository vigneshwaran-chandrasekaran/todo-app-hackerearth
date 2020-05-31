import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message, Col, Row } from 'antd';
import { Form, Input } from 'formik-antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { API } from '../../services';
import { FormActionButtons } from '../FormActionButtons';

const TodoSchema = Yup.object({
	title: Yup.string().required('Title required'),
	description: Yup.string().required('Description required'),
	// dueDate: Yup.number().required('Duedate code required'),
	// label: Yup.number().required('Label code required'),
});

function TodoForm({ onClose, editMode, editableTodo }) {
	const dispatch = useDispatch();

	const initialValues = {
		title: editMode ? editableTodo.title : undefined,
		description: editMode ? editableTodo.description : undefined,
		dueDate: editMode ? editableTodo.phone : undefined,
		label: editMode ? editableTodo.label : undefined,
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
			data: values,
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
						<Col span={12}>
							<Form.Item
								name="title"
								label="Title"
								hasFeedback={true}
								showValidateSuccess={true}
							>
								<Input name="title" placeholder="Title" />
							</Form.Item>
						</Col>
						<Col span={12}>
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
