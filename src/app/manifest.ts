import { MetadataRoute } from 'next';
import { PARISH } from '@/shared/core/parish';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: PARISH.name,
		short_name: 'Corpus Christi',
		description: `Anglican worship in ${PARISH.suburb}, ${PARISH.city}. Sunday services at 07:00 and 09:00.`,
		start_url: '/',
		display: 'minimal-ui',
		background_color: '#fbfaf7',
		theme_color: '#fbfaf7',
		icons: [
			{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
			{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
		],
	};
}
