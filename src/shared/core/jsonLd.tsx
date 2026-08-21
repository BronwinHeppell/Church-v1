import { PARISH, MAPS_URL, SERVICE_TIMES } from './parish';

const CHURCH_ID = `${PARISH.url}/#church`;
const SITE_ID = `${PARISH.url}/#website`;

export const jsonLd = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'WebSite',
			'@id': SITE_ID,
			url: `${PARISH.url}/`,
			name: PARISH.name,
			inLanguage: 'en-ZA',
			publisher: { '@id': CHURCH_ID },
		},
		{
			'@type': 'Church',
			'@id': CHURCH_ID,
			name: PARISH.name,
			alternateName: 'Corpus Christi Garsfontein',
			url: `${PARISH.url}/`,
			mainEntityOfPage: { '@id': SITE_ID },
			image: `${PARISH.url}/og.jpg`,
			logo: `${PARISH.url}/icon-512.png`,
			telephone: PARISH.phone,
			email: PARISH.email,
			hasMap: MAPS_URL,
			address: {
				'@type': 'PostalAddress',
				streetAddress: PARISH.street,
				addressLocality: PARISH.suburb,
				addressRegion: PARISH.city,
				postalCode: PARISH.postalCode,
				addressCountry: PARISH.country,
			},
			geo: {
				'@type': 'GeoCoordinates',
				latitude: PARISH.lat,
				longitude: PARISH.lng,
			},
			areaServed: {
				'@type': 'AdministrativeArea',
				name: `${PARISH.suburb}, ${PARISH.city}`,
			},
			event: SERVICE_TIMES.map((time) => ({
				'@type': 'Event',
				name: `Sunday Service, ${time}`,
				eventSchedule: {
					'@type': 'Schedule',
					repeatFrequency: 'P1W',
					byDay: 'https://schema.org/Sunday',
					startTime: time,
					scheduleTimezone: 'Africa/Johannesburg',
				},
				location: { '@id': CHURCH_ID },
				organizer: { '@id': CHURCH_ID },
				eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
				isAccessibleForFree: true,
			})),
			openingHoursSpecification: SERVICE_TIMES.map((opens) => ({
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'https://schema.org/Sunday',
				opens,
			})),
		},
	],
};
