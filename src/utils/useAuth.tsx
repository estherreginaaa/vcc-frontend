'use client';
import * as React from 'react';
import useLocalStorage from './useLocalStorage';
import { Session, User, AuthResponse } from '@/libs/types';

type AuthContextType = {
	session: Session | null;
	login: (username: string, password: string) => Promise<void>;
	register: (username: string, password: string, email: string, name: string) => Promise<void>;
	logout: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [session, setSession] = useLocalStorage<Session | null>('session', null);

	const login = async (username: string, password: string) => {
		const response = await fetch(`http://virtualcoffeeconsultationintegration.aff4h7g5dehrdecn.southeastasia.azurecontainer.io:8000/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'password',
				username: username,
				password: password,
			}),
		});

		if (response.ok) {
			const { access_token } = (await response.json()) as AuthResponse;
			const user = (await getUser(access_token)) as User;
			setSession({ user, token: access_token });
		} else throw new Error(JSON.stringify(await response.json()));
	};

	const getUser = async (token: string): Promise<User | undefined> => {
		const response = await fetch(`http://virtualcoffeeconsultationintegration.aff4h7g5dehrdecn.southeastasia.azurecontainer.io:8000/users/me`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.ok) return await response.json();
	};

	const register = async (username: string, password: string, email: string, name: string) => {
		const response = await fetch(`http://virtualcoffeeconsultationintegration.aff4h7g5dehrdecn.southeastasia.azurecontainer.io:8000/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
				email: email,
				name: name,
			}),
		});

		if (response.ok) {
			const { access_token } = (await response.json()) as AuthResponse;
			const user = (await getUser(access_token)) as User;
			setSession({ user, token: access_token });
		} else throw new Error(JSON.stringify(await response.json()));
	};

	const logout = () => {
		setSession(null);
	};

	return <AuthContext.Provider value={{ session, login, register, logout }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
	const context = React.useContext(AuthContext);
	if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
	return context;
};

export default useAuth;
