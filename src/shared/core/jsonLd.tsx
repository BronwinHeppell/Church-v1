import { PARISH, SERVICE_TIMES } from './parish';

export const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Church',
	'@id': `${PARISH.url}/#church`,
	name: PARISH.name,
	url: PARISH.url,
	image: `${PARISH.url}/static/hero.jpg`,
	telephone: PARISH.phone,
	email: PARISH.email,
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
	openingHoursSpecification: SERVICE_TIMES.map((opens) => ({
		'@type': 'OpeningHoursSpecification',
		dayOfWeek: 'https://schema.org/Sunday',
		opens,
	})),
};
