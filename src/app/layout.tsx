import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Corpus Christi Anglican Church | Worship in Garsfontein',
	description:
		'Welcome to Corpus Christi Anglican Church, offering worship services, community outreach, and more in Garsfontein. We are a community of believers who are passionate about serving God and our neighbours.',
	keywords: ['Anglican Church', 'Garsfontein', 'Worship', 'Community Outreach'],
	openGraph: {
		title: 'Corpus Christi Anglican Church',
		description:
			'Welcome to Corpus Christi Anglican Church, offering worship services, community outreach, and more in Garsfontein.',
		images: [
			{
				url: '/static/hero.jpg',
			},
		],
	},
	twitter: {
		title: 'Corpus Christi Anglican Church',
		description:
			'Welcome to Corpus Christi Anglican Church, offering worship services, community outreach, and more in Garsfontein.',
		images: ['/static/hero.jpg'],
	},
	viewport: 'width=device-width, initial-scale=1',
	authors: [
		{ name: 'Corpus Christi Anglican Church', url: 'https://www.corpus-christi-garsfontein.org' },
	],
	robots: {
		index: true,
		follow: true,
	},
	icons: {
		shortcut: '/favicon.ico',
	},
	category: 'Worship',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<link rel="icon" href="/icon.ico" sizes="any" />
			<body className={inter.className}>{children}</body>
		</html>
	);
}
