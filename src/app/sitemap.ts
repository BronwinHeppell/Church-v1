import { MetadataRoute } from 'next';
import { PARISH } from '@/shared/core/parish';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${PARISH.url}/`,
			lastModified: new Date(),
			priority: 1,
		},
	];
}
