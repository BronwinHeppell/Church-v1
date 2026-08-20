'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CalendarDays, LogOut, Users } from 'lucide-react';
import { Wordmark } from '@/shared/components/wordmark';
import { useAuth } from './auth-context';

const NAV = [
	{ label: 'Events', href: '/admin/events', Icon: CalendarDays },
	{ label: 'Users', href: '/admin/users', Icon: Users },
] as const;

/**
 * Gate plus chrome for every signed-in admin page.
 *
 * The site is a static export, so there is no server to check a session before
 * the page is served — the same as the Flutter build, which redirected on the
 * client too. What actually protects the data is Firestore and Storage security
 * rules, not this component.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
	const { user, loading, leave } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (!loading && !user) router.replace('/admin');
	}, [loading, user, router]);

	if (loading || !user) {
		return (
			<div className="grid min-h-[100dvh] place-items-center">
				<p className="font-ui text-muted text-sm" role="status">
					{loading ? 'Checking your session…' : 'Redirecting to sign in…'}
				</p>
			</div>
		);
	}

	return (
		<div className="grid min-h-[100dvh] md:grid-cols-[15rem_minmax(0,1fr)]">
			<aside className="border-line bg-raised flex flex-col border-b md:border-r md:border-b-0">
				<div className="border-line flex items-center border-b px-6 py-5">
					<Link href="/admin/events" aria-label="Corpus Christi admin">
						<Wordmark width={140} className="text-ink" />
					</Link>
				</div>

				<nav aria-label="Admin" className="flex gap-1 p-3 md:flex-1 md:flex-col">
					{NAV.map(({ label, href, Icon }) => {
						const active = pathname === href || pathname.startsWith(`${href}/`);
						return (
							<Link
								key={href}
								href={href}
								aria-current={active ? 'page' : undefined}
								className={`font-ui rounded-base ease-fluid flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-300 ${
									active
										? 'bg-accent text-accent-ink'
										: 'text-muted hover:text-ink hover:bg-[rgb(var(--scrim)/0.04)]'
								}`}
							>
								<Icon strokeWidth={1.5} className="size-4" aria-hidden />
								{label}
							</Link>
						);
					})}
				</nav>

				<div className="border-line p-3 md:border-t">
					<p className="font-ui text-muted truncate px-3 pb-2 text-xs" title={user.email ?? ''}>
						{user.email}
					</p>
					<button
						type="button"
						onClick={() => leave()}
						className="font-ui text-muted hover:text-ink rounded-base ease-fluid flex w-full items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-300 hover:bg-[rgb(var(--scrim)/0.04)]"
					>
						<LogOut strokeWidth={1.5} className="size-4" aria-hidden />
						Sign out
					</button>
				</div>
			</aside>

			<main className="min-w-0 px-5 py-8 md:px-10 md:py-12">{children}</main>
		</div>
	);
}
