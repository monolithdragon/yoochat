import React from 'react';

type AuthContextType = {
	user: unknown;
	isAuthenticated: boolean;
	login: (phoneNumber: number) => void;
	register: (phoneNumber: number) => void;
	logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);
