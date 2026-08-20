import { deleteApp, getApp, getApps, initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	sendPasswordResetEmail,
	signOut,
	updateProfile,
} from 'firebase/auth';
import {
	Timestamp,
	collection,
	deleteDoc,
	doc,
	getDocs,
	serverTimestamp,
	setDoc,
} from 'firebase/firestore';
import { auth, db, firebaseConfig } from '@/lib/firebase';

export const USERS = 'users';

/** Firebase's own floor. Anything shorter is rejected by the API. */
export const MIN_PASSWORD = 6;

const SECONDARY = 'user-creation';

export type AdminUser = {
	uid: string;
	email: string;
	name: string;
	createdAt: string;
	createdBy: string;
};

const readDate = (value: unknown): string => {
	if (value && typeof value === 'object' && 'toDate' in value) {
		return (value as Timestamp).toDate().toISOString().slice(0, 10);
	}
	return '';
};

/**
 * Accounts created through this admin.
 *
 * This is a mirror in Firestore, not the Firebase Auth user list — there is no
 * client API to enumerate Auth users, that needs the Admin SDK on a server. So
 * an account made straight from the Firebase console will not appear here.
 */
export async function listUsers(): Promise<AdminUser[]> {
	const snapshot = await getDocs(collection(db, USERS));
	return snapshot.docs
		.map((d) => {
			const data = d.data();
			return {
				uid: d.id,
				email: (data.email as string) ?? '',
				name: (data.name as string) ?? '',
				createdAt: readDate(data.createdAt),
				createdBy: (data.createdBy as string) ?? '',
			};
		})
		.sort((a, b) => b.createdAt.localeCompare(a.createdAt) || a.email.localeCompare(b.email));
}

/**
 * Creates a sign-in account without disturbing the current session.
 *
 * `createUserWithEmailAndPassword` signs in as whoever it just created, which
 * on the shared app instance would silently sign the administrator out and hand
 * them the new user's session. Running it on a second, throwaway app instance
 * keeps that side effect off the primary auth, and the instance is torn down
 * afterwards either way.
 */
export async function createUser(email: string, password: string, name: string): Promise<void> {
	const existing = getApps().find((a) => a.name === SECONDARY);
	const secondary = existing ?? initializeApp(firebaseConfig, SECONDARY);
	const secondaryAuth = getAuth(secondary);

	try {
		const created = await createUserWithEmailAndPassword(
			secondaryAuth,
			email.trim(),
			password,
		);

		if (name.trim()) {
			await updateProfile(created.user, { displayName: name.trim() });
		}

		// Mirrored so the list has something to show. Keyed by uid, so a repeat
		// creation cannot produce two rows for one account.
		await setDoc(doc(db, USERS, created.user.uid), {
			email: created.user.email,
			name: name.trim(),
			createdAt: serverTimestamp(),
			createdBy: auth.currentUser?.email ?? '',
		});

		await signOut(secondaryAuth);
	} finally {
		try {
			await deleteApp(existing ?? getApp(SECONDARY));
		} catch {
			// Already disposed of. Nothing to recover from.
		}
	}
}

export async function sendReset(email: string): Promise<void> {
	await sendPasswordResetEmail(auth, email);
}

/**
 * Removes the row from the list only. The sign-in account itself survives:
 * the client SDK can delete the signed-in user and nobody else, so revoking
 * someone's access needs the Admin SDK, or the Firebase console.
 */
export async function forgetUser(uid: string): Promise<void> {
	await deleteDoc(doc(db, USERS, uid));
}

export function authCreateMessage(error: unknown): string {
	const code = (error as { code?: string })?.code ?? '';
	switch (code) {
		case 'auth/email-already-in-use':
			return 'There is already an account with that email address.';
		case 'auth/invalid-email':
			return 'That email address does not look right.';
		case 'auth/weak-password':
			return `Use at least ${MIN_PASSWORD} characters.`;
		case 'auth/operation-not-allowed':
			return 'Email and password sign-in is switched off for this Firebase project.';
		case 'auth/admin-restricted-operation':
			return 'This Firebase project does not allow accounts to be created from the browser. It needs a Cloud Function.';
		case 'auth/network-request-failed':
			return 'No connection. Check your network and try again.';
		default:
			return 'Could not create the account. Please try again.';
	}
}

const ALPHABET = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#%^*-_';

/** Readable but strong, so it can be passed on verbally without confusion. */
export function generatePassword(length = 16): string {
	const bytes = new Uint32Array(length);
	crypto.getRandomValues(bytes);
	return Array.from(bytes, (n) => ALPHABET[n % ALPHABET.length]).join('');
}
