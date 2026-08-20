/**
 * Choosing which pew leaflet a visitor gets.
 *
 * Kept free of Firebase so it is a pure function of the documents, and can be
 * checked without a network or a signed-in user.
 */

export type LeafletRow = {
	/** Filename within the Storage `leaflets/` folder. */
	file: string;
	when: Date | null;
};

/** Firestore holds a Timestamp; a hand-edited document may hold a string. */
export function readLeafletDate(value: unknown): Date | null {
	if (value && typeof value === 'object' && 'toDate' in value) {
		const d = (value as { toDate: () => Date }).toDate();
		return d instanceof Date && !Number.isNaN(d.getTime()) ? d : null;
	}
	if (typeof value === 'string') {
		const d = new Date(value);
		return Number.isNaN(d.getTime()) ? null : d;
	}
	return null;
}

export function toLeafletRow(data: Record<string, unknown> | undefined): LeafletRow {
	return {
		file: typeof data?.file === 'string' ? data.file : '',
		when: readLeafletDate(data?.date),
	};
}

/**
 * The most recent leaflet by date.
 *
 * Rows without a file or without a usable date are dropped rather than being
 * allowed to win — an undated document would otherwise sort unpredictably and
 * could hide the real leaflet. A leaflet dated ahead of today is eligible on
 * purpose: uploading Sunday's leaflet on the Friday should publish it.
 */
export function pickLatestLeaflet(rows: LeafletRow[]): LeafletRow | null {
	const usable = rows.filter((r) => r.file && r.when);
	if (!usable.length) return null;

	return usable.reduce((best, row) => (row.when!.getTime() > best.when!.getTime() ? row : best));
}
