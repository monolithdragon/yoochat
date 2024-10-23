import { AuthContext } from 'context/auth';
import { useContext } from 'react';

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be wrapped inside AuthProvider');
	}

	return context;
}
