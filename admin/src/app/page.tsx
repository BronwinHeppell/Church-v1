'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { Wordmark } from '@/shared/components/wordmark';
import { authMessage, useAuth } from '@/admin/auth-context';

const fieldClass =
	'font-ui border-line bg-surface text-ink rounded-base ease-fluid w-full border px-3.5 py-2.5 text-[0.9375rem] transition-colors duration-300 focus:border-accent';

export default function AdminLoginPage() {
	const { user, loading, signIn } = useAuth();
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [reveal, setReveal] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState('');

	// Already signed in, so skip the form.
	useEffect(() => {
		if (!loading && user) router.replace('/events');
	}, [loading, user, router]);

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setBusy(true);
		try {
			await signIn(email, password);
			router.replace('/events');
		} catch (err) {
			setError(authMessage(err));
		} finally {
			setBusy(false);
		}
	};

	return (
		<div className="grid min-h-[100dvh] place-items-center px-5 py-10">
			<div className="w-full max-w-[22rem]">
				<Wordmark width={168} className="text-ink" />

				<h1 className="font-display mt-10 text-[2rem] leading-tight">Sign in</h1>
				<p className="font-ui text-muted mt-2 text-sm">Parish office access for managing events.</p>

				<form onSubmit={submit} className="mt-8" noValidate>
					<label className="font-ui text-ink block text-xs tracking-[0.14em] uppercase">
						Email
						<input
							type="email"
							name="email"
							autoComplete="username"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={`${fieldClass} mt-2 normal-case`}
						/>
					</label>

					<label className="font-ui text-ink mt-5 block text-xs tracking-[0.14em] uppercase">
						Password
						<span className="relative mt-2 block">
							<input
								type={reveal ? 'text' : 'password'}
								name="password"
								autoComplete="current-password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={`${fieldClass} pr-11 normal-case`}
							/>
							<button
								type="button"
								onClick={() => setReveal((r) => !r)}
								aria-label={reveal ? 'Hide password' : 'Show password'}
								className="text-muted hover:text-ink absolute inset-y-0 right-0 grid w-11 place-items-center"
							>
								{reveal ? (
									<EyeOff strokeWidth={1.5} className="size-4" aria-hidden />
								) : (
									<Eye strokeWidth={1.5} className="size-4" aria-hidden />
								)}
							</button>
						</span>
					</label>

					{error && (
						<p role="alert" className="font-ui mt-5 text-sm text-[#8c2f2f]">
							{error}
						</p>
					)}

					<Button type="submit" disabled={busy} size="lg" className="mt-7 w-full">
						{busy ? 'Signing in…' : 'Sign in'}
					</Button>
				</form>
			</div>
		</div>
	);
}
