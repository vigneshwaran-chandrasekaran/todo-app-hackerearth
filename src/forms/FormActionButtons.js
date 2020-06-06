import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'antd';
import { SubmitButton, ResetButton } from 'formik-antd';
import { Debug } from './Debug';

function FormActionButtons({ onClose, isSubmitting }) {
	return (
		<>
			<Row data-testid="FormActionButtons" type="flex" justify="flex-end">
				<Col
					span={10}
					style={{
						textAlign: 'left',
					}}
				>
					<ResetButton data-testid="form-reset-btn" type="danger">
						Reset fields
					</ResetButton>
				</Col>

				<Col
					span={14}
					style={{
						textAlign: 'right',
					}}
				>
					<Button
						data-testid="form-close-btn"
						style={{
							marginRight: 8,
						}}
						onClick={onClose}
					>
						Close
					</Button>

					<SubmitButton
						data-testid="form-save-btn"
						type="primary"
						disabled={isSubmitting}
					>
						Save
					</SubmitButton>
				</Col>
			</Row>
			{process.env.NODE_ENV === 'development' && <Debug />}
		</>
	);
}

FormActionButtons.propTypes = {
	isSubmitting: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export { FormActionButtons };
