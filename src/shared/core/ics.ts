import { PARISH } from './parish';

type IcsEvent = {
	id?: string;
	title: string;
	/** Calendar date as YYYY-MM-DD. */
	iso?: string;
	location?: string;
	description?: string;
};

const pad = (n: number) => String(n).padStart(2, '0');

const stampNow = () => {
	const d = new Date();
	return (
		`${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
		`T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
	);
};

/** Escape per RFC 5545: backslash, semicolon, comma and newline. */
const esc = (value: string) =>
	value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

const nextDay = (iso: string) => {
	const d = new Date(`${iso}T00:00:00Z`);
	d.setUTCDate(d.getUTCDate() + 1);
	return d.toISOString().slice(0, 10).replace(/-/g, '');
};

/** Builds an all-day VEVENT for a parish event. */
export function buildIcs(event: IcsEvent): string | null {
	if (!event.iso) return null;

	const start = event.iso.replace(/-/g, '');

	return [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Corpus Christi Anglican Church//Events//EN',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		'BEGIN:VEVENT',
		`UID:${event.id ?? start}@corpus-christi-garsfontein.org`,
		`DTSTAMP:${stampNow()}`,
		`DTSTART;VALUE=DATE:${start}`,
		`DTEND;VALUE=DATE:${nextDay(event.iso)}`,
		`SUMMARY:${esc(event.title)}`,
		`LOCATION:${esc(event.location || `${PARISH.street}, ${PARISH.suburb}, ${PARISH.city}`)}`,
		...(event.description ? [`DESCRIPTION:${esc(event.description)}`] : []),
		'END:VEVENT',
		'END:VCALENDAR',
	].join('\r\n');
}

const slug = (value: string) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '') || 'event';

export function downloadIcs(event: IcsEvent) {
	const ics = buildIcs(event);
	if (!ics) return;

	const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
	const a = document.createElement('a');
	a.href = url;
	a.download = `${slug(event.title)}.ics`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
