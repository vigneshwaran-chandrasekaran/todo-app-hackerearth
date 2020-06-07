import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox } from 'antd';
import { API } from '../../services';
import { TodoBox, TodoStatus } from '../todo';
import { mapValues, groupBy } from 'lodash';
import { TODO_STATUS, TODO_LABEL } from '../../helpers/constants';

const CheckboxGroup = Checkbox.Group;

const labels = TODO_LABEL.map((label) => label.key);
const plainOptions = labels;
const defaultCheckedList = labels;

export default function TodoList() {
	const [todos, setTodos] = useState([]);
	const [grouped, setGrouped] = useState([]);
	const { todoListUpdated } = useSelector((state) => state.api);

	const [state, setState] = useState({
		checkedList: defaultCheckedList,
		indeterminate: true,
		checkAll: false,
	});

	useEffect(() => {
		const CREDENTIALS = {
			url: `todos`,
			queryParams: {
				all: true,
			},
			method: 'get',
		};

		API.common(CREDENTIALS)
			.then((response) => {
				console.log('response', response);
				let grouped = mapValues(groupBy(response.data, 'status'));
				console.log('grouped', grouped);
				setTodos(response.data);
				setGrouped(grouped);
			})
			.finally(() => {});
	}, [todoListUpdated]);

	useEffect(() => {
		console.log('state', state);
		const labels = TODO_LABEL.filter((label) =>
			state.checkedList.includes(label.key)
		).map((todo) => todo.id);
		console.log('labels', labels);

		let filtered = todos.filter((todo) => labels.includes(todo.label));
		console.log('filtered', filtered);
	}, [state]);

	const onChange = (checkedList) => {
		console.log('checkedList', checkedList);

		setState({
			...state,
			checkedList,
			indeterminate:
				!!checkedList.length &&
				checkedList.length < plainOptions.length,
			checkAll: checkedList.length === plainOptions.length,
		});
	};

	const onCheckAllChange = (e) => {
		setState({
			...state,
			checkedList: e.target.checked ? plainOptions : [],
			indeterminate: false,
			checkAll: e.target.checked,
		});
	};

	return (
		<div>
			<Checkbox
				indeterminate={state.indeterminate}
				onChange={onCheckAllChange}
				checked={state.checkAll}
			>
				Check all
			</Checkbox>
			<CheckboxGroup
				options={plainOptions}
				value={state.checkedList}
				onChange={onChange}
			/>

			<div className="kanban">
				{TODO_STATUS.map((data) => (
					<div
						key={data.id}
						className={`kanban__group  ${data.className}`}
					>
						<TodoStatus data={data} />
						{grouped[data.id] &&
							grouped[data.id].map((todo) => (
								<TodoBox key={todo._id} data={todo} />
							))}
					</div>
				))}
			</div>
		</div>
	);
}
