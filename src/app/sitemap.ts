import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const sitemap = [
		{
			url: 'https://www.corpus-christi-garsfontein.org/',
			lastModified: new Date(),
			priority: 1,
		},
	];

	return sitemap;
}
