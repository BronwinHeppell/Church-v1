export type LeafletRow = {
	file: string;
	when: Date | null;
};

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

export function pickLatestLeaflet(rows: LeafletRow[]): LeafletRow | null {
	const usable = rows.filter((r) => r.file && r.when);
	if (!usable.length) return null;

	return usable.reduce((best, row) => (row.when!.getTime() > best.when!.getTime() ? row : best));
}
