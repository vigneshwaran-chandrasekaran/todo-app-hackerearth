import moment from 'moment';

export function add(a, b = 1) {
	return a + b;
}

export function dateChange(date) {
	const d = new Date(date);
	return moment(d).format('MMMM d, YYYY');
}
