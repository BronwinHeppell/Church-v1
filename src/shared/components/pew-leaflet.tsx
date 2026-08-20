'use client';

import { useEffect, useState } from 'react';
import { ArrowDownToLine } from 'lucide-react';

type Latest = { url: string; date: string };

const dateFmt = new Intl.DateTimeFormat('en-ZA', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
});

/**
 * Download for the most recent pew leaflet.
 *
 * Renders nothing at all until one is found, so an empty collection or a failed
 * lookup leaves no trace on the page rather than a dead link or an error. The
 * saved filename and the download behaviour come from metadata set at upload
 * time, because the `download` attribute is ignored for cross-origin URLs.
 */
export function PewLeaflet() {
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

				const rows = snapshot.docs
					.map((doc) => {
						const data = doc.data();
						const raw = data?.date;
						const when =
							raw && typeof raw === 'object' && 'toDate' in raw
								? raw.toDate()
								: typeof raw === 'string'
									? new Date(raw)
									: null;

						return {
							file: (data?.file as string) ?? '',
							when: when && !Number.isNaN(when.getTime()) ? when : null,
						};
					})
					.filter((r) => r.file && r.when)
					.sort((a, b) => b.when!.getTime() - a.when!.getTime());

				const newest = rows[0];
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
