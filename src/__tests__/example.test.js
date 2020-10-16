import { add } from '../helpers/example';

test('Adding 1 + 23 equals 24', () => {
	expect(add(1, 23)).toBe(24);
});

test('Adding 1 + "1" equals 13', () => {
	expect(add(1, '3')).toBe('13');
});

test('Adding "6" + 5 equals 65', () => {
	expect(add('6', 5)).toBe('65');
});

test('Adding 7 equals 8', () => {
	expect(add(7)).toBe(8);
});

test('Adding -1 + 6 equals 5', () => {
	expect(add(-1, 6)).toBe(5);
});
