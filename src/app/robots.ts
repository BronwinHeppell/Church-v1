import { MetadataRoute } from 'next';
import { PARISH } from '@/shared/core/parish';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${PARISH.url}/sitemap.xml`,
		host: PARISH.url,
	};
}
