'use client';

import { useEffect, useState } from 'react';
import { ArrowDownToLine } from 'lucide-react';
import { pickLatestLeaflet, toLeafletRow } from '@/shared/core/leaflet';

type Latest = { url: string; date: string };

const dateFmt = new Intl.DateTimeFormat('en-ZA', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
});

/**
 * Finds the most recent pew leaflet once, and shares it with every place on the
 * page that offers it, so a visitor is not the one who has to go looking.
 *
 * Which leaflet counts as the latest lives in shared/core/leaflet.ts, where it
 * is a pure function and can be checked without a network.
 */
function useLatestLeaflet() {
	const [latest, setLatest] = useState<Latest | null>(null);

	useEffect(() => {
		let cancelled = false;

		(async () => {
			try {
				const [{ collection, getDocs }, { getDownloadURL, ref }, { db, storage }] =
					await Promise.all([
						import('firebase/firestore'),
						import('firebase/storage'),
						import('@/lib/firebase'),
					]);

				const snapshot = await getDocs(collection(db, 'leaflets'));
				const newest = pickLatestLeaflet(snapshot.docs.map((doc) => toLeafletRow(doc.data())));
				if (!newest) return;

				const url = await getDownloadURL(ref(storage, `leaflets/${newest.file}`));
				if (!cancelled) setLatest({ url, date: dateFmt.format(newest.when!) });
			} catch (error) {
				// Nothing to show, and nothing the reader can do about it.
				console.error('Could not load the pew leaflet: ', error);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, []);

	return latest;
}

/**
 * The main offer, in the Worship section. Renders nothing until a leaflet is
 * found, so an empty collection or a failed lookup leaves no trace rather than
 * a dead link. The saved filename and the download behaviour come from metadata
 * set at upload time, because the `download` attribute on a link is ignored for
 * cross-origin URLs.
 */
export function PewLeaflet() {
	const latest = useLatestLeaflet();
	if (!latest) return null;

	return (
		<a
			href={latest.url}
			className="border-line rounded-frame ease-fluid group hover:border-accent/40 mt-10 flex flex-wrap items-center justify-between gap-4 border p-5 transition-colors duration-500 md:px-6"
		>
			<span>
				<span className="font-ui text-ink block text-xs tracking-[0.14em] uppercase">
					This week&rsquo;s pew leaflet
				</span>
				<span className="font-ui text-muted numerals mt-2 block text-[0.9375rem]">
					{latest.date} &middot; PDF
				</span>
			</span>

			<span className="font-ui text-accent ease-fluid inline-flex items-center gap-2 text-[0.9375rem] transition-transform duration-500 group-hover:translate-x-0.5">
				Download
				<ArrowDownToLine strokeWidth={1.5} className="size-4" aria-hidden />
			</span>
		</a>
	);
}

/** Compact version for the footer, beside the other parish documents. */
export function PewLeafletFooterLink({ className }: { className?: string }) {
	const latest = useLatestLeaflet();
	if (!latest) return null;

	return (
		<a href={latest.url} className={className}>
			Pew leaflet ({latest.date})
		</a>
	);
}

/**
 * Cell for the hero's information bar.
 *
 * Hidden below `sm` on purpose. There the bar is stacked, so a fourth row would
 * add roughly 60px to a hero that is currently tuned to fit the viewport
 * exactly — and on a phone the leaflet is still offered twice further down. From
 * `sm` up the bar is horizontal, where a fourth column costs no height at all.
 */
export function PewLeafletHeroCell({ className }: { className?: string }) {
	const latest = useLatestLeaflet();
	if (!latest) return null;

	return (
		<div className={className}>
			<dt className="text-[0.6875rem] tracking-[0.18em] text-white/55 uppercase">This week</dt>
			<dd>
				<a href={latest.url} className="rule-link inline-flex items-center gap-1.5 text-white/90">
					Pew leaflet
					<ArrowDownToLine strokeWidth={1.5} className="size-3.5" aria-hidden />
				</a>
			</dd>
		</div>
	);
}
