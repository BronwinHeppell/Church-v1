'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { AdminShell } from '@/admin/shell';
import { listEvents, removeEvent, type AdminEvent } from '@/admin/events';

const dateFmt = new Intl.DateTimeFormat('en-ZA', {
	day: '2-digit',
	month: 'short',
	year: 'numeric',
});

const pretty = (iso: string) => (iso ? dateFmt.format(new Date(`${iso}T12:00:00`)) : '—');

const truncate = (text: string, max = 90) =>
	text.length > max ? `${text.slice(0, max).trimEnd()}…` : text || '—';

export default function EventsPage() {
	const [events, setEvents] = useState<AdminEvent[]>([]);
	const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
	const [pending, setPending] = useState<AdminEvent | null>(null);
	const [deleting, setDeleting] = useState(false);

	// State already starts as 'loading', so the first fetch must not set it again
	// before awaiting — that would be a synchronous setState inside an effect.
	useEffect(() => {
		let cancelled = false;

		(async () => {
			try {
				const rows = await listEvents();
				if (!cancelled) {
					setEvents(rows);
					setState('ready');
				}
			} catch (e) {
				console.error('Could not load events', e);
				if (!cancelled) setState('error');
			}
		})();

		return () => {
			cancelled = true;
		};
	}, []);

	const retry = useCallback(async () => {
		setState('loading');
		try {
			setEvents(await listEvents());
			setState('ready');
		} catch (e) {
			console.error('Could not load events', e);
			setState('error');
		}
	}, []);

	// Escape closes the confirmation, same as any dialog.
	useEffect(() => {
		if (!pending) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && !deleting) setPending(null);
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [pending, deleting]);

	const confirmDelete = async () => {
		if (!pending) return;
		setDeleting(true);
		try {
			await removeEvent(pending);
			setEvents((list) => list.filter((e) => e.id !== pending.id));
			setPending(null);
		} catch (e) {
			console.error('Could not delete event', e);
		} finally {
			setDeleting(false);
		}
	};

	const today = new Date().toISOString().slice(0, 10);

	return (
		<AdminShell>
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<h1 className="font-display text-[2rem] leading-tight">Events</h1>
					<p className="font-ui text-muted mt-2 text-sm">
						{state === 'ready'
							? `${events.length} ${events.length === 1 ? 'event' : 'events'}, newest first`
							: 'Everything the website lists under Upcoming events.'}
					</p>
				</div>
				<Button asChild className="gap-2">
					<Link href="/admin/events/edit">
						<Plus strokeWidth={1.5} className="size-4" aria-hidden />
						Add event
					</Link>
				</Button>
			</div>

			{state === 'loading' && (
				<p role="status" className="font-ui text-muted mt-10 text-sm">
					Loading events…
				</p>
			)}

			{state === 'error' && (
				<div role="alert" className="border-line rounded-base mt-10 border p-6">
					<p className="font-ui text-ink text-sm">Could not load the events.</p>
					<p className="font-ui text-muted mt-2 text-sm">
						Check your connection and Firestore permissions, then try again.
					</p>
					<Button variant="outline" size="sm" className="mt-4" onClick={retry}>
						Retry
					</Button>
				</div>
			)}

			{state === 'ready' && events.length === 0 && (
				<div className="border-line rounded-base mt-10 border p-8 text-center">
					<h2 className="font-display text-xl">No events yet</h2>
					<p className="font-ui text-muted mx-auto mt-2 max-w-[40ch] text-sm">
						Add one and it appears on the website straight away, as long as its date has not passed.
					</p>
				</div>
			)}

			{state === 'ready' && events.length > 0 && (
				<div className="border-line rounded-base mt-8 overflow-x-auto border">
					<table className="w-full min-w-[52rem] border-collapse text-left">
						<thead>
							<tr className="border-line bg-raised border-b">
								{['Date', 'Title', 'Short description', 'Extra detail', 'Location', ''].map((h) => (
									<th
										key={h || 'actions'}
										scope="col"
										className="font-ui text-muted px-4 py-3 text-xs tracking-[0.14em] uppercase"
									>
										{h}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{events.map((event) => {
								const past = event.date !== '' && event.date < today;
								return (
									<tr key={event.id} className="border-line border-b last:border-b-0">
										<td className="font-ui numerals text-ink px-4 py-4 text-sm whitespace-nowrap">
											{pretty(event.date)}
											{past && (
												<span className="font-ui text-muted mt-1 block text-xs">
													Past — hidden on the site
												</span>
											)}
										</td>
										<td className="font-ui text-ink px-4 py-4 text-sm">{event.title || '—'}</td>
										<td className="font-ui text-muted max-w-[18rem] px-4 py-4 text-sm">
											{truncate(event.shortDescription)}
										</td>
										<td className="font-ui text-muted max-w-[14rem] px-4 py-4 text-sm">
											{truncate(event.additionalInformation, 60)}
										</td>
										<td className="font-ui text-muted px-4 py-4 text-sm">
											{event.location || '—'}
										</td>
										<td className="px-4 py-4">
											<div className="flex items-center justify-end gap-1">
												<Link
													href={`/admin/events/edit?id=${encodeURIComponent(event.id)}`}
													aria-label={`Edit ${event.title || 'event'}`}
													className="text-muted hover:text-accent rounded-base ease-fluid grid size-9 place-items-center transition-colors duration-300 hover:bg-[rgb(var(--scrim)/0.04)]"
												>
													<Pencil strokeWidth={1.5} className="size-4" aria-hidden />
												</Link>
												<button
													type="button"
													onClick={() => setPending(event)}
													aria-label={`Delete ${event.title || 'event'}`}
													className="text-muted rounded-base ease-fluid grid size-9 place-items-center transition-colors duration-300 hover:bg-[rgb(140_47_47/0.08)] hover:text-[#8c2f2f]"
												>
													<Trash2 strokeWidth={1.5} className="size-4" aria-hidden />
												</button>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}

			{pending && (
				<div className="fixed inset-0 z-50 grid place-items-center bg-[rgb(var(--scrim)/0.5)] px-5">
					<div
						role="dialog"
						aria-modal="true"
						aria-labelledby="delete-title"
						className="bg-surface border-line rounded-base w-full max-w-md border p-7"
					>
						<h2 id="delete-title" className="font-display text-xl">
							Delete this event?
						</h2>
						<p className="font-ui text-muted mt-3 text-sm">
							<span className="text-ink">{pending.title || 'This event'}</span> will be removed from
							the website immediately.
							{pending.image ? ' Its image will be deleted too.' : ''} This cannot be undone.
						</p>
						<div className="mt-7 flex justify-end gap-3">
							<Button variant="outline" onClick={() => setPending(null)} disabled={deleting}>
								Cancel
							</Button>
							<button
								type="button"
								onClick={confirmDelete}
								disabled={deleting}
								className="font-ui rounded-base ease-fluid h-11 bg-[#8c2f2f] px-5 text-[0.9375rem] text-white transition-opacity duration-300 hover:opacity-90 disabled:opacity-50"
							>
								{deleting ? 'Deleting…' : 'Delete'}
							</button>
						</div>
					</div>
				</div>
			)}
		</AdminShell>
	);
}
