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
				console.error('Could not load the pew leaflet: ', error);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, []);

	return latest;
}

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

export function PewLeafletFooterLink({ className }: { className?: string }) {
	const latest = useLatestLeaflet();
	if (!latest) return null;

	return (
		<a href={latest.url} className={className}>
			Pew leaflet ({latest.date})
		</a>
	);
}

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
