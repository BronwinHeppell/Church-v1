'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy, KeyRound, RefreshCw, UserPlus, X } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { AdminShell } from '@/admin/shell';
import {
	MIN_PASSWORD,
	authCreateMessage,
	createUser,
	forgetUser,
	generatePassword,
	listUsers,
	sendReset,
	type AdminUser,
} from '@/admin/users';

const fieldClass =
	'font-ui border-line bg-surface text-ink rounded-base ease-fluid w-full border px-3.5 py-2.5 text-[0.9375rem] transition-colors duration-300 focus:border-accent';

const labelClass = 'font-ui text-muted block text-xs';

export default function UsersPage() {
	const [users, setUsers] = useState<AdminUser[]>([]);
	const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState('');
	const [created, setCreated] = useState<{ email: string; password: string } | null>(null);
	const [copied, setCopied] = useState(false);
	const [notice, setNotice] = useState('');
	const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => () => clearTimeout(copyTimer.current), []);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const rows = await listUsers();
				if (!cancelled) {
					setUsers(rows);
					setState('ready');
				}
			} catch (e) {
				console.error('Could not load users', e);
				if (!cancelled) setState('error');
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	const refresh = useCallback(async () => {
		try {
			setUsers(await listUsers());
			setState('ready');
		} catch (e) {
			console.error('Could not load users', e);
			setState('error');
		}
	}, []);

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setNotice('');

		if (!email.trim()) {
			setError('Enter an email address.');
			return;
		}
		if (password.length < MIN_PASSWORD) {
			setError(`The password needs at least ${MIN_PASSWORD} characters.`);
			return;
		}

		setBusy(true);
		try {
			await createUser(email, password, name);
			setCreated({ email: email.trim(), password });
			setEmail('');
			setName('');
			setPassword('');
			await refresh();
		} catch (err) {
			console.error('Could not create user', err);
			setError(authCreateMessage(err));
		} finally {
			setBusy(false);
		}
	};

	const copyCredentials = async () => {
		if (!created) return;
		try {
			await navigator.clipboard.writeText(`${created.email} / ${created.password}`);
			setCopied(true);
			clearTimeout(copyTimer.current);
			copyTimer.current = setTimeout(() => setCopied(false), 2000);
		} catch {}
	};

	const reset = async (user: AdminUser) => {
		setNotice('');
		try {
			await sendReset(user.email);
			setNotice(`Password reset email sent to ${user.email}.`);
		} catch (e) {
			console.error('Could not send reset', e);
			setNotice(`Could not send a reset email to ${user.email}.`);
		}
	};

	const forget = async (user: AdminUser) => {
		try {
			await forgetUser(user.uid);
			setUsers((list) => list.filter((u) => u.uid !== user.uid));
		} catch (e) {
			console.error('Could not remove user from the list', e);
		}
	};

	return (
		<AdminShell>
			<div className="max-w-3xl">
				<h1 className="font-display text-[2rem] leading-tight">Users</h1>
				<p className="font-ui text-muted mt-2 text-sm">Accounts that can sign in to this admin.</p>

				<form
					onSubmit={submit}
					className="border-line rounded-base bg-raised mt-8 border p-5 md:p-6"
					noValidate
				>
					<h2 className="font-ui text-ink text-xs tracking-[0.14em] uppercase">New account</h2>

					<div className="mt-4 grid gap-4 sm:grid-cols-2">
						<label className={labelClass}>
							Email
							<input
								type="email"
								autoComplete="off"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={`${fieldClass} mt-2`}
							/>
						</label>

						<label className={labelClass}>
							Name <span className="text-muted">(optional)</span>
							<input
								type="text"
								autoComplete="off"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className={`${fieldClass} mt-2`}
							/>
						</label>
					</div>

					<div className="mt-4">
						<label className={labelClass}>
							Initial password
							<span className="mt-2 flex flex-wrap gap-2">
								<input
									type="text"
									autoComplete="off"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder={`At least ${MIN_PASSWORD} characters`}
									className={`${fieldClass} flex-1`}
								/>
								<Button
									type="button"
									variant="outline"
									className="gap-2"
									onClick={() => setPassword(generatePassword())}
								>
									<RefreshCw strokeWidth={1.5} className="size-4" aria-hidden />
									Generate
								</Button>
							</span>
						</label>
						<p className="font-ui text-muted mt-2 text-xs">
							Shown in plain text on purpose, so you can pass it on. Ask them to change it, or send
							a reset email from the list below.
						</p>
					</div>

					{error && (
						<p role="alert" className="font-ui mt-5 text-sm text-[#8c2f2f]">
							{error}
						</p>
					)}

					<Button type="submit" disabled={busy} className="mt-6 gap-2">
						<UserPlus strokeWidth={1.5} className="size-4" aria-hidden />
						{busy ? 'Creating…' : 'Create account'}
					</Button>
				</form>

				{created && (
					<div
						role="status"
						className="border-accent/40 rounded-base mt-5 border bg-[rgb(30_77_59/0.04)] p-5"
					>
						<p className="font-ui text-ink text-sm">Account created.</p>
						<p className="font-ui text-muted mt-2 text-sm">
							<span className="text-ink">{created.email}</span> can sign in with the password below.
							It is not shown again once you leave this page.
						</p>
						<div className="mt-4 flex flex-wrap items-center gap-3">
							<code className="font-ui border-line bg-surface rounded-base border px-3 py-2 text-sm">
								{created.password}
							</code>
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="gap-2"
								onClick={copyCredentials}
							>
								{copied ? (
									<Check strokeWidth={1.5} className="size-3.5" aria-hidden />
								) : (
									<Copy strokeWidth={1.5} className="size-3.5" aria-hidden />
								)}
								{copied ? 'Copied' : 'Copy'}
							</Button>
							<Button type="button" variant="ghost" size="sm" onClick={() => setCreated(null)}>
								Dismiss
							</Button>
						</div>
					</div>
				)}

				{notice && (
					<p role="status" className="font-ui text-muted mt-5 text-sm">
						{notice}
					</p>
				)}

				<h2 className="font-ui text-ink mt-12 text-xs tracking-[0.14em] uppercase">Created here</h2>
				<p className="font-ui text-muted mt-2 text-xs">
					Firebase does not let a browser list sign-in accounts, so this shows accounts made through
					this page rather than every account on the project. Anything created in the Firebase
					console will not appear.
				</p>

				{state === 'loading' && (
					<p role="status" className="font-ui text-muted mt-6 text-sm">
						Loading…
					</p>
				)}

				{state === 'error' && (
					<div role="alert" className="border-line rounded-base mt-6 border p-6">
						<p className="font-ui text-ink text-sm">Could not load the list.</p>
						<Button variant="outline" size="sm" className="mt-4" onClick={refresh}>
							Retry
						</Button>
					</div>
				)}

				{state === 'ready' && users.length === 0 && (
					<p className="font-ui text-muted border-line rounded-base mt-6 border p-6 text-sm">
						No accounts created here yet.
					</p>
				)}

				{state === 'ready' && users.length > 0 && (
					<ul className="border-line rounded-base mt-6 divide-y divide-[var(--color-line)] border">
						{users.map((user) => (
							<li key={user.uid} className="flex flex-wrap items-center gap-4 p-4">
								<div className="min-w-0 flex-1">
									<p className="font-ui text-ink truncate text-sm">{user.email}</p>
									<p className="font-ui text-muted mt-1 truncate text-xs">
										{user.name ? `${user.name} · ` : ''}
										{user.createdAt ? `added ${user.createdAt}` : 'added recently'}
										{user.createdBy ? ` by ${user.createdBy}` : ''}
									</p>
								</div>

								<div className="flex items-center gap-1">
									<button
										type="button"
										onClick={() => reset(user)}
										aria-label={`Send a password reset email to ${user.email}`}
										title="Send password reset email"
										className="text-muted hover:text-accent rounded-base ease-fluid grid size-9 place-items-center transition-colors duration-300 hover:bg-[rgb(var(--scrim)/0.04)]"
									>
										<KeyRound strokeWidth={1.5} className="size-4" aria-hidden />
									</button>
									<button
										type="button"
										onClick={() => forget(user)}
										aria-label={`Remove ${user.email} from this list`}
										title="Remove from this list — the sign-in account remains"
										className="text-muted hover:text-ink rounded-base ease-fluid grid size-9 place-items-center transition-colors duration-300 hover:bg-[rgb(var(--scrim)/0.04)]"
									>
										<X strokeWidth={1.5} className="size-4" aria-hidden />
									</button>
								</div>
							</li>
						))}
					</ul>
				)}

				<p className="font-ui text-muted border-line mt-8 border-t pt-6 text-xs">
					Revoking access is not possible from here. The client SDK can only delete the account that
					is currently signed in, so removing someone means the Firebase console, or a Cloud
					Function using the Admin SDK.
				</p>
			</div>
		</AdminShell>
	);
}
