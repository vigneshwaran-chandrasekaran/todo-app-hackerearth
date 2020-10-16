import { add } from '../helpers/example';

test('Adding 1 + 1 equals 2', () => {
	expect(add(1, 23)).toBe(24);
});

test('Adding 1 + 1 equals 2', () => {
	expect(add(1, '3')).toBe('13');
});

test('Adding 1 + 1 equals 2', () => {
	expect(add('6', 5)).toBe('65');
});

test('Adding 1 + 1 equals 2', () => {
	expect(add(7)).toBe(8);
});
