'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

type AuthState = {
	user: User | null;
	loading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	leave: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		return onAuthStateChanged(auth, (next) => {
			setUser(next);
			setLoading(false);
		});
	}, []);

	const value = useMemo<AuthState>(
		() => ({
			user,
			loading,
			signIn: async (email, password) => {
				await signInWithEmailAndPassword(auth, email.trim(), password);
			},
			leave: () => signOut(auth),
		}),
		[user, loading],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
	return ctx;
}

export function authMessage(error: unknown): string {
	const code = (error as { code?: string })?.code ?? '';
	switch (code) {
		case 'auth/invalid-email':
			return 'That email address does not look right.';
		case 'auth/missing-password':
			return 'Enter your password.';
		case 'auth/invalid-credential':
		case 'auth/wrong-password':
		case 'auth/user-not-found':
			return 'Those details do not match an account.';
		case 'auth/too-many-requests':
			return 'Too many attempts. Wait a few minutes and try again.';
		case 'auth/network-request-failed':
			return 'No connection. Check your network and try again.';
		default:
			return 'Could not sign in. Please try again.';
	}
}
