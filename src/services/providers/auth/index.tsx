import React, { PropsWithChildren, useEffect, useState } from 'react';
import { AuthContext } from 'context/auth';

export default function AuthProvider({ children }: PropsWithChildren) {
	const [user, setUser] = useState<unknown>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		// onAuthStateChanged
		setTimeout(() => {
			setIsAuthenticated(false);
		}, 3000);
	}, []);

	const login = async (phoneNumber: number) => {};
	const register = async (phoneNumber: number) => {};
	const logout = async () => {};

	const contextValue = { user, isAuthenticated, login, register, logout };
	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
