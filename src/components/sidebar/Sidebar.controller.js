import { SESSION } from '../../services';

export function findUrlPathId(path) {
	switch (path) {
		case '/todo':
			return '1';
		case '/logout':
			return '4';
		default:
			return '1';
	}
}

export const handleLogout = () => {
	SESSION.logout();
};
