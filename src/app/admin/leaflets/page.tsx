'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, FileText, Trash2, Upload } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { AdminShell } from '@/admin/shell';
import {
	MAX_LEAFLET_BYTES,
	leafletUrl,
	listLeaflets,
	removeLeaflet,
	uploadLeaflet,
	type Leaflet,
} from '@/admin/leaflets';

const dateFmt = new Intl.DateTimeFormat('en-ZA', {
	weekday: 'long',
	day: 'numeric',
	month: 'long',
	year: 'numeric',
});

const pretty = (iso: string) => (iso ? dateFmt.format(new Date(`${iso}T12:00:00`)) : '—');

/** Nearest Sunday, on or before today — the leaflet's usual date. */
const defaultSunday = () => {
	const d = new Date();
	d.setDate(d.getDate() - d.getDay());
	return d.toISOString().slice(0, 10);
};

export default function LeafletsPage() {
	const [leaflets, setLeaflets] = useState<Leaflet[]>([]);
	const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
	// Lazy initialiser rather than an effect. The shell renders its session check
	// instead of this form until auth resolves, so the build-time value is never
	// written into the prerendered HTML and cannot cause a hydration mismatch.
	const [date, setDate] = useState(defaultSunday);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState('');
	const [pending, setPending] = useState<Leaflet | null>(null);
	const fileRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const rows = await listLeaflets();
				if (!cancelled) {
					setLeaflets(rows);
					setState('ready');
				}
			} catch (e) {
				console.error('Could not load leaflets', e);
				if (!cancelled) setState('error');
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	const refresh = useCallback(async () => {
		try {
			setLeaflets(await listLeaflets());
			setState('ready');
		} catch (e) {
			console.error('Could not load leaflets', e);
			setState('error');
		}
	}, []);

	const upload = async (file: File | undefined) => {
		if (!file) return;

		if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
			setError('The pew leaflet needs to be a PDF.');
			return;
		}
		if (file.size > MAX_LEAFLET_BYTES) {
			setError('That PDF is over 20MB. Export it at a smaller size and try again.');
			return;
		}
		if (!date) {
			setError('Pick the Sunday this leaflet is for.');
			return;
		}

		setError('');
		setBusy(true);
		try {
			await uploadLeaflet(file, date);
			await refresh();
			if (fileRef.current) fileRef.current.value = '';
		} catch (e) {
			console.error('Upload failed', e);
			setError('The upload did not finish. Check your connection and try again.');
		} finally {
			setBusy(false);
		}
	};

	const confirmDelete = async () => {
		if (!pending) return;
		setBusy(true);
		try {
			await removeLeaflet(pending);
			setLeaflets((list) => list.filter((l) => l.id !== pending.id));
			setPending(null);
		} catch (e) {
			console.error('Could not delete leaflet', e);
		} finally {
			setBusy(false);
		}
	};

	const open = async (leaflet: Leaflet) => {
		const url = await leafletUrl(leaflet.file);
		if (url) window.open(url, '_blank', 'noopener');
	};

	return (
		<AdminShell>
			<div className="max-w-3xl">
				<h1 className="font-display text-[2rem] leading-tight">Pew leaflet</h1>
				<p className="font-ui text-muted mt-2 text-sm">
					The most recent leaflet is the one the website offers. Older ones stay here as an archive
					and are not shown publicly.
				</p>

				<div className="border-line rounded-base bg-raised mt-8 border p-5 md:p-6">
					<h2 className="font-ui text-ink text-xs tracking-[0.14em] uppercase">Upload a leaflet</h2>

					<div className="mt-4 flex flex-wrap items-end gap-4">
						<label className="font-ui text-muted block text-xs">
							Sunday
							<input
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								className="font-ui border-line bg-surface text-ink rounded-base numerals ease-fluid focus:border-accent mt-2 block border px-3.5 py-2.5 text-[0.9375rem] transition-colors duration-300"
							/>
						</label>

						<input
							ref={fileRef}
							type="file"
							accept="application/pdf,.pdf"
							onChange={(e) => upload(e.target.files?.[0])}
							className="sr-only"
						/>
						<Button
							type="button"
							className="gap-2"
							disabled={busy}
							onClick={() => fileRef.current?.click()}
						>
							<Upload strokeWidth={1.5} className="size-4" aria-hidden />
							{busy ? 'Uploading…' : 'Choose PDF'}
						</Button>
					</div>

					<p className="font-ui text-muted mt-3 text-xs">
						PDF, under 20MB. Uploading replaces what the website offers, as long as its date is the
						most recent.
					</p>

					{error && (
						<p role="alert" className="font-ui mt-4 text-sm text-[#8c2f2f]">
							{error}
						</p>
					)}
				</div>

				{state === 'loading' && (
					<p role="status" className="font-ui text-muted mt-8 text-sm">
						Loading leaflets…
					</p>
				)}

				{state === 'error' && (
					<div role="alert" className="border-line rounded-base mt-8 border p-6">
						<p className="font-ui text-ink text-sm">Could not load the leaflets.</p>
						<Button variant="outline" size="sm" className="mt-4" onClick={refresh}>
							Retry
						</Button>
					</div>
				)}

				{state === 'ready' && leaflets.length === 0 && (
					<div className="border-line rounded-base mt-8 border p-8 text-center">
						<h2 className="font-display text-xl">No leaflets yet</h2>
						<p className="font-ui text-muted mx-auto mt-2 max-w-[42ch] text-sm">
							Until one is uploaded, the website shows nothing at all rather than a broken link.
						</p>
					</div>
				)}

				{state === 'ready' && leaflets.length > 0 && (
					<ul className="border-line rounded-base mt-8 divide-y divide-[var(--color-line)] border">
						{leaflets.map((leaflet, i) => (
							<li key={leaflet.id} className="flex flex-wrap items-center gap-4 p-4">
								<FileText strokeWidth={1.5} className="text-muted size-5 shrink-0" aria-hidden />

								<div className="min-w-0 flex-1">
									<p className="font-ui text-ink text-sm">
										{pretty(leaflet.date)}
										{i === 0 && (
											<span className="bg-accent text-accent-ink rounded-base ml-3 px-2 py-0.5 text-[0.6875rem] tracking-[0.1em] uppercase">
												On the site
											</span>
										)}
									</p>
									<p className="font-ui text-muted mt-1 truncate text-xs">
										{leaflet.originalName || leaflet.file}
									</p>
								</div>

								<div className="flex items-center gap-1">
									<button
										type="button"
										onClick={() => open(leaflet)}
										aria-label={`Open the leaflet for ${pretty(leaflet.date)}`}
										className="text-muted hover:text-accent rounded-base ease-fluid grid size-9 place-items-center transition-colors duration-300 hover:bg-[rgb(var(--scrim)/0.04)]"
									>
										<ExternalLink strokeWidth={1.5} className="size-4" aria-hidden />
									</button>
									<button
										type="button"
										onClick={() => setPending(leaflet)}
										aria-label={`Delete the leaflet for ${pretty(leaflet.date)}`}
										className="text-muted rounded-base ease-fluid grid size-9 place-items-center transition-colors duration-300 hover:bg-[rgb(140_47_47/0.08)] hover:text-[#8c2f2f]"
									>
										<Trash2 strokeWidth={1.5} className="size-4" aria-hidden />
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>

			{pending && (
				<div className="fixed inset-0 z-50 grid place-items-center bg-[rgb(var(--scrim)/0.5)] px-5">
					<div
						role="dialog"
						aria-modal="true"
						aria-labelledby="leaflet-delete-title"
						className="bg-surface border-line rounded-base w-full max-w-md border p-7"
					>
						<h2 id="leaflet-delete-title" className="font-display text-xl">
							Delete this leaflet?
						</h2>
						<p className="font-ui text-muted mt-3 text-sm">
							The leaflet for <span className="text-ink">{pretty(pending.date)}</span> and its PDF
							will be removed.
							{leaflets[0]?.id === pending.id && leaflets.length > 1
								? ' The website will fall back to the next most recent one.'
								: ''}
							{leaflets[0]?.id === pending.id && leaflets.length === 1
								? ' The website will stop offering a leaflet.'
								: ''}
						</p>
						<div className="mt-7 flex justify-end gap-3">
							<Button variant="outline" onClick={() => setPending(null)} disabled={busy}>
								Cancel
							</Button>
							<button
								type="button"
								onClick={confirmDelete}
								disabled={busy}
								className="font-ui rounded-base ease-fluid h-11 bg-[#8c2f2f] px-5 text-[0.9375rem] text-white transition-opacity duration-300 hover:opacity-90 disabled:opacity-50"
							>
								{busy ? 'Deleting…' : 'Delete'}
							</button>
						</div>
					</div>
				</div>
			)}
		</AdminShell>
	);
}
